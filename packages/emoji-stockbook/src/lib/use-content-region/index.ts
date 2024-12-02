import { customElementScopedValue } from "../custom-element-scoped-value";
import { ContentRegion } from "./content-region.svelte";

export const useContentRegion = customElementScopedValue(
  () => new ContentRegion(),
);
