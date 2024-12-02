import { isNativeEmoji } from "@emoji-stockbook/types";
import type { NormalizedEmoji, NormalizedEmojiGroup } from "../types";
import { customElementScopedValue } from "./custom-element-scoped-value";
import { useRepository } from "./use-repository";

export interface ISearchFeature {
  readonly isSearchMode: boolean;
  readonly groups: NormalizedEmojiGroup[];
  searchEmojis(query: string): void;
  leaveSearchMode(): void;
}

class State {
  isSearchMode = $state(false);
  searchResult = $state<NormalizedEmoji[]>([]);
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
    readonly isSearchMode = $derived(state.isSearchMode);
    readonly groups = $derived<NormalizedEmojiGroup[]>([
      {
        id: -1,
        emojis: state.searchResult,
        name: "Search Result",
      },
    ]);
    leaveSearchMode() {
      state.isSearchMode = false;
      state.searchResult = repo.getAllEmojis();
      state.lastQuery = "";
    }
    searchEmojis(query: string) {
      if (query === "") {
        this.leaveSearchMode();
        return;
      }

      const lastQuery = state.lastQuery;
      state.lastQuery = query;

      state.isSearchMode = true;

      if (query.startsWith(lastQuery)) {
        state.searchResult = narrowResult(state.searchResult, query);
      } else {
        state.searchResult = narrowResult(repo.getAllEmojis(), query);
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
