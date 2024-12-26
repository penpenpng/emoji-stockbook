import { useCustomElementProperty } from "@/lib/use-custom-element-property";
import { useEmojiRepository } from "@/lib/use-emoji-repository";
import type { Emoji, EmojiOutput } from "@/types";
import { LocalStorageHistoryManager } from "../history-manager";

export interface IShortcutFeature {
  readonly title: string;
  readonly emojis: Promise<Emoji[]>;
  readonly maxRows: number;
  updateHistory(output: EmojiOutput): void;
  clearHistory(): void;
}

export class ShortcutFeature implements IShortcutFeature {
  private rootProps = useCustomElementProperty();
  private repo = useEmojiRepository();

  // Updated to force `emojis` to be reevaluated
  private key = $state(0);

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

    // `emojis` depends on `key`, but `key` is not used to compute `emojis`.
    void this.key;

    const records = config.history.getHistory();
    const emojiPointers = [...records]
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .map((e) => e.pointer);
    const emojis = await Promise.all(
      emojiPointers.map((pointer) => this.repo.getEmojiByPointer(pointer))
    );

    return emojis.filter((e) => !!e);
  });

  readonly maxRows = $derived.by(() => this.config?.maxRows ?? 0);

  updateHistory(output: EmojiOutput): void {
    // Don't use spread syntax to plune unneeded fields.
    if (output.kind === "native") {
      this.config?.history.updateHistory({
        kind: "native",
        char: output.char,
        version: output.version,
        original: output.original,
      });
    } else {
      this.config?.history.updateHistory({
        kind: "custom",
        emojiset: output.emojiset,
        id: output.id,
      });
    }
  }

  clearHistory(): void {
    this.config?.history.clearHistory();
    this.key++;
  }
}
