import { useEmojiRepository } from "@/lib/use-emoji-repository";
import type { Emoji } from "@/types";

export interface ISearchFeature {
  readonly searching: boolean;
  readonly result: Emoji[];
  searchEmojis(query: string): void;
  leaveSearchMode(): void;
}

class State {
  searching = $state(false);
  result = $state.raw<Emoji[]>([]);
  lastQuery = "";
}

export class SearchFeature implements ISearchFeature {
  private state = new State();
  private repo = useEmojiRepository();

  readonly searching = $derived.by(() => this.state.searching);
  readonly result = $derived.by(() => this.state.result);

  async searchEmojis(query: string) {
    if (query === "") {
      this.leaveSearchMode();
      return;
    }

    const lastQuery = this.state.lastQuery;
    this.state.lastQuery = query;

    this.state.searching = true;

    const heystack =
      lastQuery && query.startsWith(lastQuery)
        ? this.state.result
        : this.repo.emojis;

    this.state.result = narrowResult(await heystack, query);
  }

  leaveSearchMode() {
    this.state.searching = false;
    this.state.lastQuery = "";
  }
}

function narrowResult(emojis: Emoji[], query: string): Emoji[] {
  const result: Emoji[] = [];

  for (const emoji of emojis) {
    if (
      emoji.shortcode.includes(query) ||
      emoji.keywords?.some((keyword) => keyword.includes(query)) ||
      (emoji.kind === "native" && emoji.char.startsWith(query))
    ) {
      result.push(emoji);
    }
  }

  return result;
}
