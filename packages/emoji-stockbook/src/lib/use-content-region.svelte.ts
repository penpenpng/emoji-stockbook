import type { ContentType, NormalizedEmojiGroup } from "../types";
import { useSearchFeature } from "./use-search-feature.svelte";
import { customElementScopedValue } from "./custom-element-scoped-value";
import { useRepository } from "./use-repository";

class State {
  defaultGroups = $state<NormalizedEmojiGroup[]>([]);
  contentType = $state<ContentType>("flat");
}

const [setupContentRegion, useState] = customElementScopedValue(
  () => new State(),
);
export { setupContentRegion };

export interface UseContentRegion {
  readonly contentType: ContentType;
  readonly groups: NormalizedEmojiGroup[];
  reset: () => void;
}

export const useContentRegion = (): UseContentRegion => {
  const state = useState();
  const repo = useRepository();
  const searchFeature = useSearchFeature();

  return new (class {
    readonly contentType = $derived(state.contentType);
    readonly groups = $derived<NormalizedEmojiGroup[]>(
      searchFeature.isSearchMode ? searchFeature.groups : state.defaultGroups,
    );
    reset() {
      state.contentType = repo.isGroupedExplicitly() ? "grouped" : "flat";
      state.defaultGroups = repo.getAllEmojiGroups();
    }
  })();
};
