import type { CustomEmoji, NativeEmoji } from "@emoji-stockbook/types";

export type ContentType = "flat" | "grouped";

export interface NormalizedNativeEmoji extends NativeEmoji {
  id: string;
}
export interface NormalizedCustomEmoji extends CustomEmoji {
  id: string;
}
export type NormalizedEmoji = NormalizedNativeEmoji | NormalizedCustomEmoji;

export interface NormalizedEmojiGroup {
  id: number;
  name: string;
  emojis: NormalizedEmoji[];
}

export interface SkintoneAppliedNativeEmoji extends NormalizedNativeEmoji {
  id: string;
  appliedSkintone: string | null;
  naked: string;
}
export type PickedEmoji = SkintoneAppliedNativeEmoji | NormalizedCustomEmoji;

export type I18nResource = Record<
  string /* language code */,
  Record<string /* key */, string /* value */>
>;

export interface IHistoryManager {
  updateHistory(emojiId: string): void;
  getHistory(): HistoryRecord[];
  clearHistory(): void;
}

export interface HistoryRecord {
  emojiId: string;
  count: number;
  updatedAt: number;
}

export type ShortcutSectionMode = "recently-used" | "frequently-used";

export interface ShortcutSectionConfig {
  history: IHistoryManager;
  maxRows?: number;
  mode?: ShortcutSectionMode;
  title?: string;
}
