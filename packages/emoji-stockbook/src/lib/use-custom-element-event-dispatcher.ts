import { customElementScopedValue } from "@/lib/custom-element-scoped-value";
import type { EmojiOutput } from "@/types";

export interface ComponentEventDispatcher {
  (type: "initialized"): void;
  (type: "pick", emoji: EmojiOutput): void;
}

export const useCustomElementEventDispatcher = customElementScopedValue(
  (dispatch: ComponentEventDispatcher) => dispatch
);
