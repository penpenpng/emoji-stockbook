import type {
  CustomEmoji,
  CustomEmojiCategory,
  CustomEmojiCategoryInput,
  CustomEmojiInput,
  Emojiset,
  EmojisetInput,
  NativeEmoji,
  NativeEmojiCategory,
  NativeEmojiCategoryInput,
  NativeEmojiInput,
} from "../../types";

const makeNativeEmoji =
  (key: string) =>
  (input: NativeEmojiInput): NativeEmoji => ({
    ...input,
    kind: "native",
    emojiset: key,
    id: input.char,
  });

const makeNativeEmojiCategory =
  (key: string) =>
  (input: NativeEmojiCategoryInput): NativeEmojiCategory => ({
    ...input,
    kind: "native",
    emojis: input.emojis.map(makeNativeEmoji(key)),
  });

const makeCustomEmoji =
  (key: string) =>
  (input: CustomEmojiInput): CustomEmoji => ({
    ...input,
    kind: "custom",
    emojiset: key,
    id: input.id ?? input.shortcode,
  });

const makeCustomEmojiCategory =
  (key: string) =>
  (input: CustomEmojiCategoryInput): CustomEmojiCategory => ({
    ...input,
    kind: "custom",
    emojis: input.emojis.map(makeCustomEmoji(key)),
  });

export const makeEmojiset = (key: string, input: EmojisetInput): Emojiset => {
  if (input.kind === "native") {
    return {
      kind: "native",
      categories: input.categories.map(makeNativeEmojiCategory(key)),
    };
  } else {
    return {
      kind: "custom",
      categories: input.categories.map(makeCustomEmojiCategory(key)),
    };
  }
};
