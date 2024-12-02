import type { NormalizedEmoji } from "../types";
import { customElementScopedValue } from "./custom-element-scoped-value";

export interface ComponentEventDispatcher {
  (type: "initialized"): void;
  (type: "show"): void;
  (type: "hide"): void;
  (type: "input", emoji: NormalizedEmoji): void;
}

export const useCustomElementEventDispatcher = customElementScopedValue(
  (dispatch: ComponentEventDispatcher) => dispatch,
);
