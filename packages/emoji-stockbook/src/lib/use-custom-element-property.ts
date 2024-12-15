import { customElementScopedValue } from "./custom-element-scoped-value";
import type { I18nResource } from "./use-translation";
import type { IHistoryManager } from "./history-manager";

export interface IEmojiStockbookProperty {
  readonly col: number;
  readonly i18n: I18nResource;
  readonly lang?: string;
  readonly shortcut: ShortcutSectionConfig | boolean;
}

export type ShortcutSectionMode = "recently-used" | "frequently-used";

export interface ShortcutSectionConfig {
  history?: IHistoryManager;
  maxRows?: number;
  mode?: ShortcutSectionMode;
  title?: string;
}

export const useCustomElementProperty = customElementScopedValue(
  (value: IEmojiStockbookProperty) => value,
);
