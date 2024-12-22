export type Emojiset = NativeEmojiset | CustomEmojiset;

export interface NativeEmojiset {
  kind: "native";
  categories: NativeEmojiCategory[];
}

export interface CustomEmojiset {
  kind: "custom";
  categories: CustomEmojiCategory[];
}

export interface NativeEmojiCategory {
  kind: "native";
  id: string;
  name: string;
  emojis: NativeEmoji[];
}

export interface CustomEmojiCategory {
  kind: "custom";
  id: string;
  name: string;
  emojis: CustomEmoji[];
}

export type EmojiCategory = NativeEmojiCategory | CustomEmojiCategory;

export interface NativeEmoji {
  kind: "native";
  emojiset: string;
  /** Same as `char` */
  id: string;
  char: string;
  shortcode: string;
  keywords: string[];
}

export interface CustomEmoji {
  kind: "custom";
  emojiset: string;
  id: string;
  src: string;
  alt?: string;
  shortcode: string;
  keywords?: string[];
}

export type Emoji = NativeEmoji | CustomEmoji;

export type GlobalEmojiId = [emojiset: string, emojiId: string];
