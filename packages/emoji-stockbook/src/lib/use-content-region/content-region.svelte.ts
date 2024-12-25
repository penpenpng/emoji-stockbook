import type { Emoji } from "../../types";
import { useEmojiRepository } from "../use-emoji-repository/index";
import { useSearchFeature } from "../use-search-feature/index";

export interface IContentRegion {
  readonly sections: Promise<SectionContent[]>;
}

interface SectionContent {
  id: string;
  name: string;
  emojis: Emoji[];
}

export class ContentRegion implements IContentRegion {
  private searchFeature = useSearchFeature();
  private repo = useEmojiRepository();

  readonly sections = $derived.by(async () => {
    if (this.searchFeature.searching) {
      return [
        {
          id: "stockbook-search-result",
          emojis: this.searchFeature.result,
          name: "search.title.result",
        },
      ];
    } else {
      return this.repo.categories;
    }
  });
}
