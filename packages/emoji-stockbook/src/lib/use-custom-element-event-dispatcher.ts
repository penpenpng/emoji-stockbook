import { scoped, ScopedValue } from "@/lib/custom-element-scoped-value";
import type { EmojiOutput } from "@/types";

export interface EventDispatcher {
  (type: "initialized"): void;
  (type: "pick", emoji: EmojiOutput): void;
}

export class CustomElementEventDispatcher extends ScopedValue {
  dispatch: EventDispatcher = () => {};

  initialize(dispatch: EventDispatcher) {
    this.dispatch = dispatch;
  }
}

export const useCustomElementEventDispatcher = scoped(
  CustomElementEventDispatcher
);
