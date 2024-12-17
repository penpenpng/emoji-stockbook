import type { I18nResource } from "../use-translation";
import type { IHistoryManager } from "../history-manager";

// Note that we should also edit `<svelte:options customElement>`
export interface AcceptableEmojiStockbookProperty {
  emojisets?: string;
  col?: number;
  i18n?: I18nResource;
  lang?: string;
  shortcut?: ShortcutSectionConfig | boolean;
}

export interface IEmojiStockbookProperty {
  readonly emojisets: string[];
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

export class EmojiStockbookProperty implements IEmojiStockbookProperty {
  private props = $state<AcceptableEmojiStockbookProperty>();

  readonly emojisets = $derived.by(() =>
    (this.props?.emojisets ?? "native").split(","),
  );
  readonly col = $derived.by(() => this.props?.col ?? 8);
  readonly i18n = $derived.by(() => this.props?.i18n ?? {});
  readonly lang = $derived.by(() => this.props?.lang);
  readonly shortcut = $derived.by(() => this.props?.shortcut ?? true);

  constructor(props) {
    this.props = props;
  }
}
