import type { CustomEmoji, NativeEmoji } from "@emoji-stockbook/types";

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
