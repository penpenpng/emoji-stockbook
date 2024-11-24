import { isNativeEmoji } from "@emoji-stockbook/types";
import type {
  ISearchController,
  IRepository,
  NormalizedEmoji,
  NormalizedEmojiGroup,
} from "../types";

export class SearchController implements ISearchController {
  constructor(private repo: IRepository) {}

  isSearchMode = $state(false);

  private searchResult = $state<NormalizedEmoji[]>([]);
  groups = $derived<NormalizedEmojiGroup[]>([
    {
      id: -1,
      emojis: this.searchResult,
      name: "Search Result",
    },
  ]);

  private lastQuery = "";

  leaveSearchMode(): void {
    this.isSearchMode = false;
    this.searchResult = this.repo.getAllEmojis();
    this.lastQuery = "";
  }
  searchEmojis(query: string): void {
    if (query === "") {
      this.leaveSearchMode();
      return;
    }

    const lastQuery = this.lastQuery;
    this.lastQuery = query;

    this.isSearchMode = true;

    if (query.startsWith(lastQuery)) {
      this.searchResult = narrowResult(this.searchResult, query);
    } else {
      this.searchResult = narrowResult(this.repo.getAllEmojis(), query);
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
