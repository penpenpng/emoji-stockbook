import type { CustomEmoji } from "./emoji";

export interface NativeEmojiOutput {
  emojiset: string;
  char: string;
  shortcode: string;
  keywords?: string[];
  version: number;
  original?: string;
}

export type EmojiOutput = NativeEmojiOutput | CustomEmoji;
