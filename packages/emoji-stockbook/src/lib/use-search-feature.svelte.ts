import { isNativeEmoji } from "@emoji-stockbook/types";
import type { NormalizedEmoji } from "../types";
import { customElementScopedValue } from "./custom-element-scoped-value";
import { useRepository } from "./use-repository";

class State {
  searching = $state(false);
  result = $state.raw<NormalizedEmoji[]>([]);
  lastQuery = "";
}

const [setupSearchFeature, useState] = customElementScopedValue(
  () => new State(),
);
export { setupSearchFeature };

export const useSearchFeature = () => {
  const state = useState();
  const repo = useRepository();

  return new (class {
    readonly searching = $derived(state.searching);
    readonly result = $derived(state.result);
    leaveSearchMode() {
      state.searching = false;
      state.result = repo.getAllEmojis();
      state.lastQuery = "";
    }
    searchEmojis(query: string) {
      if (query === "") {
        this.leaveSearchMode();
        return;
      }

      const lastQuery = state.lastQuery;
      state.lastQuery = query;

      state.searching = true;

      if (query.startsWith(lastQuery)) {
        state.result = narrowResult(state.result, query);
      } else {
        state.result = narrowResult(repo.getAllEmojis(), query);
      }
    }
  })();
};

function narrowResult(
  emojis: NormalizedEmoji[],
  query: string,
): NormalizedEmoji[] {
  const result: NormalizedEmoji[] = [];

  for (const emoji of emojis) {
    if (
      emoji.shortcode.includes(query) ||
      emoji.keywords?.some((keyword) => keyword.includes(query)) ||
      (isNativeEmoji(emoji) && emoji.char === query)
    ) {
      result.push(emoji);
    }
  }

  return result;
}
