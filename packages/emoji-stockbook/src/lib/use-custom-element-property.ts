import { customElementScopedValue } from "./custom-element-scoped-value";

export interface IEmojiStockbookProperty {
  readonly col: number;
}

export const useCustomElementProperty = customElementScopedValue(
  (value: IEmojiStockbookProperty) => value,
);
