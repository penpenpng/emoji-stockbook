import dataByGroup from "unicode-emoji-json/data-by-group.json";
import keywordsByEmoji from "emojilib";
import type { EmojiGroup, NativeEmoji } from "@emoji-stockbook/types";

// TODO: Generate at compile-time
const stockbookData = Object.entries(dataByGroup).map(
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
  })
);

export { stockbookData };
