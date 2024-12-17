export interface NativeEmojiset {
  kind: "native";
  categories: NativeEmojiCategory[];
}

export interface CustomEmojiset {
  // kind: "custom" の指定をユーザにやらせるのは間違っているが、あとからなんとでもなるので
  // とりあえずユーザがご丁寧に kind を指定してくれたものとして実装していく
  kind: "custom";
  categories: CustomEmojiCategory[];
}

export type Emojiset = NativeEmojiset | CustomEmojiset;

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
  // こちら側で用意するので optional なデータはなく、必要なものはあらかじめ全部揃っている想定
  id: string; // char と同じ
  char: string;
  shortcode: string;
  keywords: string[];
  supportsSkintone?: boolean;
}

export interface CustomEmoji {
  kind: "custom";
  // namespace の区切りに使うので '/' を許可しない
  id: string;
  src: string;
  alt?: string;
  shortcode: string;
  keywords?: string[];
}

export type Emoji = NativeEmoji | CustomEmoji;

export type SkintoneApplied<T> = T & {
  skintone: string | null;
  naked: string;
};

export type PickedEmoji = SkintoneApplied<NativeEmoji> | CustomEmoji;
