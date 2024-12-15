import { customElementScopedValue } from "../custom-element-scoped-value";
import { type IContentRegion, ContentRegion } from "./content-region.svelte";

export type { IContentRegion };

export const useContentRegion = customElementScopedValue(
  (): IContentRegion => new ContentRegion(),
);
