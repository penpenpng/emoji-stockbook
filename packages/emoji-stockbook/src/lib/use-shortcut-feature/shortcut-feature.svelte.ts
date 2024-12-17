import type { Emoji } from "../../types";
import { useCustomElementProperty } from "../use-custom-element-property";
import { useTranslation } from "../use-translation";
import { useEmojiRepository } from "../use-emoji-repository";
import { LocalStorageHistoryManager } from "../history-manager";

export interface IShortcutFeature {
  readonly title: string;
  readonly emojis: Emoji[];
  readonly maxRows: number;
  clearHistory(): void;
  reset(): void;
}

export class ShortcutFeature implements IShortcutFeature {
  private rootProps = useCustomElementProperty();
  private t = useTranslation().t;

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
      return this.t(config.title);
    }

    if (config.mode === "frequently-used") {
      return this.t("shortcut.title.frequently-used");
    } else {
      return this.t("shortcut.title.recently-used");
    }
  });

  private _emojis = $state<Emoji[]>([]);
  readonly emojis = $derived.by(() =>
    this._emojis.slice(0, this.rootProps.col * this.maxRows),
  );

  readonly maxRows = $derived.by(() => this.config?.maxRows ?? 0);

  clearHistory(): void {
    this.config?.history.clearHistory();
    this.reset();
  }

  reset(): void {
    const config = this.config;

    if (!config) {
      return;
    }

    const history = config.history.getHistory();

    // TODO: promisify。 byId のクエリごとに promise が生まれるの嫌なのでまとめてクエリする方法を repo/regi 側で提供する
    // if (config.mode === "frequently-used") {
    //   this._emojis = [...history]
    //     .sort((a, b) => b.updatedAt - a.updatedAt)
    //     .map((e) => this.repo.getEmojiById(e.emojiId))
    //     .filter((e) => !!e);
    // } else {
    //   this._emojis = [...history]
    //     .sort((a, b) => b.count - a.count)
    //     .map((e) => this.repo.getEmojiById(e.emojiId))
    //     .filter((e) => !!e);
    // }
  }
}
