import { customElementScopedValue } from "../custom-element-scoped-value";
import { CustomElementVisibility } from "./custom-element-visibility.svelte";

export const useCustomElementVisibility = customElementScopedValue(
  () => new CustomElementVisibility(),
);
