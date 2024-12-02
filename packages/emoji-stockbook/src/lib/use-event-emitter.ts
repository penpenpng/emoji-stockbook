import mitt from "mitt";
import type { NormalizedEmoji } from "../types";
import { customElementScopedValue } from "./custom-element-scoped-value";

const [setupEventEmitter, useEventEmitter] = customElementScopedValue(() =>
  mitt<EmojiStockbookEventMap>(),
);
export { setupEventEmitter, useEventEmitter };

type EmojiStockbookEventMap = {
  input: NormalizedEmoji;
  show: void;
  hide: void;
};
