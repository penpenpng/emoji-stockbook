import { customElementScopedValue } from "../custom-element-scoped-value";
import {
  type ISkintoneFeature,
  SkintoneFeature,
} from "./skintone-feature.svelte";

export const useSkintoneFeature = customElementScopedValue(
  (): ISkintoneFeature => new SkintoneFeature(),
);
