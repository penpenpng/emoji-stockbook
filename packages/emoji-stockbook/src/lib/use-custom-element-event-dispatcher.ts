import type { EmojiOutput } from "../types";
import { customElementScopedValue } from "./custom-element-scoped-value";

export interface ComponentEventDispatcher {
  (type: "initialized"): void;
  (type: "pick", emoji: EmojiOutput): void;
}

export const useCustomElementEventDispatcher = customElementScopedValue(
  (dispatch: ComponentEventDispatcher) => dispatch
);
