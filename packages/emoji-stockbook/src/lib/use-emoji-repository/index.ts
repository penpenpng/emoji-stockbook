import { customElementScopedValue } from "../custom-element-scoped-value";
import { type IEmojiRepository, EmojiRepository } from "./emoji-repository";

export const useEmojiRepository = customElementScopedValue(
  (): IEmojiRepository => new EmojiRepository(),
);
