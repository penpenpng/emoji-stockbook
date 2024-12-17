import keywordsByEmoji from "emojilib";
import dataByGroup from "unicode-emoji-json/data-by-group.json";

// TODO:
// - コンパイル時に圧縮した形式のデータを作る
// - 圧縮した形式から可読な形式に変換する関数 f を作って f(data) を export する

interface NativeEmojiset {
  kind: "native";
  categories: NativeEmojiCategory[];
}

interface NativeEmojiCategory {
  kind: "native";
  id: string;
  name: string;
  emojis: NativeEmoji[];
}

interface NativeEmoji {
  kind: "native";
  id: string;
  char: string;
  shortcode: string;
  keywords: string[];
  supportsSkintone?: boolean;
}

// TODO: Generate at compile-time
const categories: NativeEmojiCategory[] = Object.entries(dataByGroup).map(
  ([name, emojis]) => ({
    id: "native (TODO: versioning)",
    kind: "native",
    name,
    emojis: emojis.map((emoji): NativeEmoji => {
      return {
        id: emoji.slug,
        kind: "native",
        shortcode: emoji.slug,
        char: emoji.emoji,
        keywords: keywordsByEmoji[emoji.emoji],
        supportsSkintone: emoji.skin_tone_support,
      };
    }),
  }),
);

export const stockbookData: NativeEmojiset = {
  kind: "native",
  categories,
};
