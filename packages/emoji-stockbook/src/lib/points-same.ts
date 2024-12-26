import type { EmojiSpecifier } from "@/types";

export const pointsSame = (a: EmojiSpecifier, b: EmojiSpecifier) =>
  (a.kind === "native" && b.kind === "native" && a.char === b.char) ||
  (a.kind === "custom" &&
    b.kind === "custom" &&
    a.emojiset === b.emojiset &&
    a.id === b.id);
