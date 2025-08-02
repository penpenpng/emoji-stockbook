import { useEmojiRepository } from "@/lib/use-emoji-repository.svelte.js";
import { useSearchFeature } from "@/lib/use-search-feature.svelte.js";
import type { Emoji } from "@/types";
import { scoped, ScopedValue } from "./custom-element-scoped-value.js";

interface SectionContent {
  id: string;
  name: string;
  emojis: Emoji[];
}

export class ContentRegion extends ScopedValue {
  private searchFeature = useSearchFeature();
  private repo = useEmojiRepository();

  readonly sections: Promise<SectionContent[]> = $derived.by(async () => {
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

export const useContentRegion = scoped(ContentRegion);
