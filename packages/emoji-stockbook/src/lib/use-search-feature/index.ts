import { customElementScopedValue } from "../custom-element-scoped-value";
import { type ISearchFeature, SearchFeature } from "./search-feature.svelte";

export type { ISearchFeature };

export const useSearchFeature = customElementScopedValue(
  (): ISearchFeature => new SearchFeature(),
);
