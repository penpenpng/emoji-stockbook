import { useSearchFeature } from "./use-search-feature.svelte";
import { useContentRegion } from "./use-content-region.svelte";

export const useInitializer = () => {
  const searchFeature = useSearchFeature();
  const contentRegion = useContentRegion();

  const initialize = () => {
    contentRegion.reset();
    searchFeature.leaveSearchMode();
  };

  return { initialize };
};
