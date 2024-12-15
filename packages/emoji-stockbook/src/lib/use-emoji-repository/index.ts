import { customElementScopedValue } from "../custom-element-scoped-value";
import { type IEmojiRepository, EmojiRepository } from "./emoji-repository";

export type { IEmojiRepository };

export const useEmojiRepository = customElementScopedValue(
  (): IEmojiRepository => new EmojiRepository(),
);
