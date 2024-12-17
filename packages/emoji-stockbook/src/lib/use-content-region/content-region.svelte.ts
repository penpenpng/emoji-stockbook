import type { EmojiCategory } from "../../types";
import { useSearchFeature } from "../use-search-feature/index";
import { useEmojiRepository } from "../use-emoji-repository/index";

export interface IContentRegion {
  readonly categories: Promise<EmojiCategory[]>;
  reset(): void;
}

export class ContentRegion implements IContentRegion {
  private searchFeature = useSearchFeature();
  private repo = useEmojiRepository();

  readonly categories = $derived.by(async () => {
    if (this.searchFeature.searching) {
      return [
        {
          kind: "custom", // TODO これおかしい。まあ許容してもいいが、コメントは残す
          id: "result",
          emojis: this.searchFeature.result,
          name: "Search Result",
        } as EmojiCategory,
      ];
    } else {
      return this.repo.categories;
    }
  });

  reset() {}
}
