import type { Emoji } from "../../types";
import { useCustomElementProperty } from "../use-custom-element-property";
import { useEmojiRepository } from "../use-emoji-repository";
import { LocalStorageHistoryManager } from "../history-manager";

export interface IShortcutFeature {
  readonly title: string;
  readonly emojis: Promise<Emoji[]>;
  readonly maxRows: number;
  clearHistory(): void;
}

export class ShortcutFeature implements IShortcutFeature {
  private rootProps = useCustomElementProperty();
  private repo = useEmojiRepository();

  private config = $derived.by(() => {
    const shortcut = this.rootProps.shortcut;

    if (!shortcut) {
      return null;
    }

    return {
      ...shortcut,
      history: shortcut.history ?? new LocalStorageHistoryManager(),
      maxRows: shortcut.maxRows ?? 2,
      mode: shortcut.mode ?? "frequently-used",
    };
  });

  readonly title = $derived.by(() => {
    const config = this.config;

    if (!config) {
      return "";
    }
    if (config.title) {
      return config.title;
    }

    if (config.mode === "frequently-used") {
      return "shortcut.title.frequently-used";
    } else {
      return "shortcut.title.recently-used";
    }
  });

  readonly emojis = $derived.by(async () => {
    const config = this.config;
    if (!config) {
      return [];
    }

    const records = config.history.getHistory();
    const emojiIds = [...records]
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .map((e) => e.id);
    const emojis = await Promise.all(
      emojiIds.map((id) => this.repo.getEmojiById(id)),
    );

    return emojis.filter((e) => !!e);
  });

  readonly maxRows = $derived.by(() => this.config?.maxRows ?? 0);

  clearHistory(): void {
    this.config?.history.clearHistory();
  }
}
