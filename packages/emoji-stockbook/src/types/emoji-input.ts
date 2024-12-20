export type EmojisetInput = NativeEmojisetInput | CustomEmojisetInput;

export interface NativeEmojisetInput {
  kind: "native";
  categories: NativeEmojiCategoryInput[];
}

export interface CustomEmojisetInput {
  kind: "custom";
  categories: CustomEmojiCategoryInput[];
}

export interface NativeEmojiCategoryInput {
  id: string;
  name: string;
  emojis: NativeEmojiInput[];
}

export interface CustomEmojiCategoryInput {
  id: string;
  name: string;
  emojis: CustomEmojiInput[];
}

export interface NativeEmojiInput {
  char: string;
  shortcode: string;
  keywords: string[];
  supportsSkintone?: boolean;
}

export interface CustomEmojiInput {
  id?: string;
  src: string;
  alt?: string;
  shortcode: string;
  keywords?: string[];
}
