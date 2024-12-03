import type {
  EmojiGroup,
  NativeEmoji,
  EmojiRepositoryDataset,
} from "@emoji-stockbook/types";
import keywordsByEmoji from "emojilib";
import dataByGroup from "unicode-emoji-json/data-by-group.json";

// TODO:
// - コンパイル時に圧縮した形式のデータを作る
// - 圧縮した形式から可読な形式に変換する関数 f を作って f(data) を export する

// TODO: Generate at compile-time
const data: EmojiGroup[] = Object.entries(dataByGroup).map(
  ([groupName, emojis]): EmojiGroup => ({
    name: groupName,
    emojis: emojis.map((emoji): NativeEmoji => {
      const nativeEmoji: NativeEmoji = {
        shortcode: emoji.slug,
        char: emoji.emoji,
      };

      const keywords = (keywordsByEmoji as Record<string, string[]>)[
        nativeEmoji.char
      ];
      if (keywords) {
        nativeEmoji.keywords = keywords;
      }

      if (emoji.skin_tone_support) {
        nativeEmoji.skinToneSupport = true;
      }

      return nativeEmoji;
    }),
  }),
);

export const stockbookData: EmojiRepositoryDataset = {
  data,
  skintones: [],
};
