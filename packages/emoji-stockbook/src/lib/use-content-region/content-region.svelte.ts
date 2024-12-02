import type { ContentType, NormalizedEmojiGroup } from "../../types";
import { useSearchFeature } from "../use-search-feature/index";
import { useEmojiRepository } from "../use-emoji-repository/index";

export interface IContentRegion {
  readonly contentType: ContentType;
  readonly groups: NormalizedEmojiGroup[];
  reset(): void;
}

class State {
  defaultGroups = $state.raw<NormalizedEmojiGroup[]>([]);
  contentType = $state<ContentType>("flat");
}

export class ContentRegion implements IContentRegion {
  private state = new State();
  private searchFeature = useSearchFeature();
  private repo = useEmojiRepository();

  readonly contentType = $derived.by(() => this.state.contentType);
  readonly groups = $derived.by(() => {
    if (this.searchFeature.searching) {
      return [
        {
          id: -1,
          emojis: this.searchFeature.result,
          name: "Search Result",
        },
      ];
    } else {
      return this.state.defaultGroups;
    }
  });

  reset() {
    this.state.contentType = this.repo.isGroupedExplicitly()
      ? "grouped"
      : "flat";
    this.state.defaultGroups = this.repo.getAllEmojiGroups();
  }
}
