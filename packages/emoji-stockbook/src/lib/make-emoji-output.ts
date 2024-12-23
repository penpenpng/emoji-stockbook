import type { Emoji, EmojiOutput } from "../types";

export const makeEmojiOutput = (emoji: Emoji): EmojiOutput => {
  // Don't use spread syntax to plune unneeded fields.
  if (emoji.kind === "native") {
    return {
      kind: "native",
      char: emoji.char,
      emojiset: emoji.emojiset,
      shortcode: emoji.shortcode,
      version: emoji.version,
      keywords: emoji.keywords,
      original: undefined, // TODO: variant を pick できるようになったらここ直す
    };
  } else {
    return {
      kind: "custom",
      emojiset: emoji.emojiset,
      id: emoji.id,
      shortcode: emoji.shortcode,
      src: emoji.src,
      alt: emoji.alt,
      keywords: emoji.keywords,
    };
  }
};
