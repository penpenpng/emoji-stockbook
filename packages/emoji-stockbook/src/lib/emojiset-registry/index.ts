import { type IEmojisetRegistry, EmojiRegistry } from "./emojiset-registry";

declare global {
  var __emojistockbook__emojiset_registry: IEmojisetRegistry;
}

window.__emojistockbook__emojiset_registry ??= new EmojiRegistry();

export const getEmojisetRegistry = (): IEmojisetRegistry => {
  const reg = window.__emojistockbook__emojiset_registry;
  if (!reg) {
    throw new Error("EmojisetRegistry not found");
  }

  return reg;
};
