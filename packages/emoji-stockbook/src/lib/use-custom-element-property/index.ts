import { customElementScopedValue } from "@/lib/custom-element-scoped-value";
import {
  EmojiStockbookProperty,
  type AcceptableEmojiStockbookProperty,
  type IEmojiStockbookProperty,
} from "./custom-element-property.svelte";

export type { IEmojiStockbookProperty };

export const useCustomElementProperty = customElementScopedValue(
  (props: AcceptableEmojiStockbookProperty) => new EmojiStockbookProperty(props)
);
