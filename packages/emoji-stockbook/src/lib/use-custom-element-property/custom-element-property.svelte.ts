import type { IHistoryManager } from "@/lib/history-manager";
import type { I18nResource } from "@/lib/use-translation";

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
  readonly shortcut: ShortcutSectionConfig | null;
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
    (this.props?.emojisets ?? "16").split(",")
  );
  readonly col = $derived.by(() => this.props?.col ?? 8);
  readonly i18n = $derived.by(() => this.props?.i18n ?? {});
  readonly lang = $derived.by(() => this.props?.lang);
  readonly shortcut = $derived.by(() => {
    const shortcut = this.props?.shortcut;

    if (typeof shortcut === "boolean") {
      if (shortcut) {
        return {};
      } else {
        return null;
      }
    } else {
      return shortcut ?? null;
    }
  });

  constructor(props: AcceptableEmojiStockbookProperty) {
    this.props = props;
  }
}
