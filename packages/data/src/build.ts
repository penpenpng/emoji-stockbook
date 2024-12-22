import type { Emoji as EmojibaseEmoji } from "emojibase";
import groups from "emojibase-data/meta/groups.json";
import shortcodes from "emojibase-data/en/shortcodes/emojibase.json";
import type { Emoji, Emojiset } from "./types";
import { UArray } from "./utils";

const getShortcode = (hexcode: string): string | undefined => {
  const shortcode: string | string[] | undefined = shortcodes[hexcode];
  if (!shortcode) {
    return undefined;
  }
  if (typeof shortcode === "string") {
    return shortcode;
  }
  return shortcode[0];
};

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

    const shortcode = getShortcode(emoji.hexcode);
    if (shortcode === undefined) {
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

  return UArray.mapfilter(
    Object.entries(emojisByGroup),
    ([groupNumber, emojis], skip) => {
      if (emojis.length <= 0) {
        return skip;
      }

      return {
        id: `${groupNumber}`,
        name: `category.title.${groups.groups[`${groupNumber}`]}`,
        emojis,
      };
    },
  );
};
