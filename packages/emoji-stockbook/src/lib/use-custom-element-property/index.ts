import { customElementScopedValue } from "../custom-element-scoped-value";
import {
  EmojiStockbookProperty,
  type IEmojiStockbookProperty,
  type AcceptableEmojiStockbookProperty,
} from "./custom-element-property.svelte";

export type { IEmojiStockbookProperty };

export const useCustomElementProperty = customElementScopedValue(
  (props: AcceptableEmojiStockbookProperty) =>
    new EmojiStockbookProperty(props),
);
