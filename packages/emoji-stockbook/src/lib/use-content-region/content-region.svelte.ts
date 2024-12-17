import type { EmojiCategory } from "../../types";
import { useSearchFeature } from "../use-search-feature/index";
import { useEmojiRepository } from "../use-emoji-repository/index";

export interface IContentRegion {
  readonly categories: Promise<EmojiCategory[]>;
  reset(): void;
}

class State {
  defaultGroups = $state.raw<EmojiCategory[]>([]);
}

export class ContentRegion implements IContentRegion {
  private state = new State();
  private searchFeature = useSearchFeature();
  private repo = useEmojiRepository();

  readonly categories = $derived.by(async () => {
    if (this.searchFeature.searching) {
      return [
        {
          kind: "custom", // TODO これおかしい
          id: "result",
          emojis: this.searchFeature.result,
          name: "Search Result",
        } as EmojiCategory,
      ];
    } else {
      return this.repo.categories;
    }
  });

  reset() {
    // this.state.defaultGroups = this.repo.getAllEmojiGroups();
  }
}
