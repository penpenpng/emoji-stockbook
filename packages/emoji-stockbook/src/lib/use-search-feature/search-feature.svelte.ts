import { isNativeEmoji } from "@emoji-stockbook/types";
import type { NormalizedEmoji } from "../../types";
import { useEmojiRepository } from "../use-emoji-repository/index";

export interface ISearchFeature {
  readonly searching: boolean;
  readonly result: NormalizedEmoji[];
  leaveSearchMode(): void;
  searchEmojis(query: string);
}

class State {
  searching = $state(false);
  result = $state.raw<NormalizedEmoji[]>([]);
  lastQuery = "";
}

export class SearchFeature implements ISearchFeature {
  private state = new State();
  private repo = useEmojiRepository();

  readonly searching = $derived.by(() => this.state.searching);
  readonly result = $derived.by(() => this.state.result);

  leaveSearchMode() {
    this.state.searching = false;
    this.state.result = this.repo.getAllEmojis();
    this.state.lastQuery = "";
  }

  searchEmojis(query: string) {
    if (query === "") {
      this.leaveSearchMode();
      return;
    }

    const lastQuery = this.state.lastQuery;
    this.state.lastQuery = query;

    this.state.searching = true;

    if (query.startsWith(lastQuery)) {
      this.state.result = narrowResult(this.state.result, query);
    } else {
      this.state.result = narrowResult(this.repo.getAllEmojis(), query);
    }
  }
}

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
