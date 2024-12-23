import { customElementScopedValue } from "../custom-element-scoped-value";
import { type IPreviewFeature, PreviewFeature } from "./preview-feature.svelte";

export type { IPreviewFeature };

export const usePreviewFeature = customElementScopedValue(
  (): IPreviewFeature => new PreviewFeature()
);
