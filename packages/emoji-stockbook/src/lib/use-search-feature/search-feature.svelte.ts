import type { Emoji } from "../../types";
import { useEmojiRepository } from "../use-emoji-repository";

// TODO: ゆるい入力形式をサポートしたあとにこっちに着手

export interface ISearchFeature {
  readonly searching: boolean;
  readonly result: Emoji[];
  readonly suggestions: Suggestion[];
  searchEmojis(query: string);
}

interface Suggestion {
  shortcode: string;
  content: string;
}

class State {
  searching = $state(false);
  result = $state.raw<Emoji[]>([]);
  lastQuery = "";
  suggestions = $state.raw<Suggestion[]>([]);
}

export class SearchFeature implements ISearchFeature {
  private state = new State();
  private repo = useEmojiRepository();

  readonly searching = $derived.by(() => this.state.searching);
  readonly result = $derived.by(() => this.state.result);
  readonly suggestions = $derived.by(() => this.state.suggestions);

  searchEmojis(query: string) {
    if (query === "") {
      this.reset();
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

  private reset() {
    const allEmojis = this.repo.getAllEmojis();

    this.state.searching = false;
    this.state.result = allEmojis;
    this.state.lastQuery = "";
    this.state.suggestions = allEmojis.map((emoji) => ({
      shortcode: emoji.shortcode,
      content: isNativeEmoji(emoji) ? emoji.char : "",
    }));
  }
}

function narrowResult(emojis: Emoji[], query: string): Emoji[] {
  const result: Emoji[] = [];

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
