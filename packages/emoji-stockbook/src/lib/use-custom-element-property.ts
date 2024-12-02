import { customElementScopedValue } from "./custom-element-scoped-value";

export interface IEmojiStockbookProperty {
  readonly col: number;
}

const [setupCustomElementProperty, useCustomElementProperty] =
  customElementScopedValue((value: IEmojiStockbookProperty) => value);
export { setupCustomElementProperty, useCustomElementProperty };
