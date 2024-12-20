import type { CustomEmoji, NativeEmoji } from "./emoji";

export type SkintoneApplied<T> = T & {
  skintone: string | null;
  naked: string;
};

export type EmojiOutput = SkintoneApplied<NativeEmoji> | CustomEmoji;
