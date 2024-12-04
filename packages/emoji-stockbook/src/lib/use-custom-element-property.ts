import type { I18nResource } from "../types";
import { customElementScopedValue } from "./custom-element-scoped-value";

export interface IEmojiStockbookProperty {
  readonly col: number;
  readonly i18n: I18nResource;
  readonly lang?: string;
}

export const useCustomElementProperty = customElementScopedValue(
  (value: IEmojiStockbookProperty) => value,
);
