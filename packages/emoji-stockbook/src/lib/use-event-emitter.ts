import mitt, { type Emitter } from "mitt";
import type { NormalizedEmoji } from "../types";
import { customElementScopedValue } from "./custom-element-scoped-value";

export interface IEventController {
  emitter: Emitter<EmojiStockbookEventMap>;
}

const [setupEventEmitter, useEventEmitter] = customElementScopedValue(() =>
  mitt<EmojiStockbookEventMap>(),
);
export { setupEventEmitter, useEventEmitter };

type EmojiStockbookEventMap = {
  input: NormalizedEmoji;
  show: void;
  hide: void;
};
