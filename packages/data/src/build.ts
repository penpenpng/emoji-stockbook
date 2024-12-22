import type { Emoji as EmojibaseEmoji } from "emojibase";
import groups from "emojibase-data/meta/groups.json";
import shortcodes from "emojibase-data/en/shortcodes/emojibase.json";
import type { Emoji, Emojiset } from "./types";

export const build = (emojis: EmojibaseEmoji[]): Emojiset => {
  const emojisByGroup: Record<number, Emoji[]> = {};
  for (const groupNumber of Object.keys(groups.groups)) {
    emojisByGroup[Number(groupNumber)] = [];
  }

  for (const emoji of emojis) {
    // Emojis that represents latin alphabets (🇦 - 🇿), which is included in version 0.
    if (typeof emoji.group !== "number") {
      continue;
    }

    const shortcode = shortcodes[emoji.hexcode]?.[0];
    if (typeof shortcode !== "string") {
      continue;
    }

    emojisByGroup[emoji.group].push({
      char: emoji.emoji,
      shortcode,
      keywords: emoji.tags,
      version: emoji.version,
      variants: emoji.skins?.map((variant) => ({
        char: variant.emoji,
        version: variant.version,
      })),
    });
  }

  return Object.entries(emojisByGroup).map(([groupNumber, emojis]) => ({
    id: `${groupNumber}`,
    name: `category.title.${groupNumber}`,
    emojis,
  }));
};
