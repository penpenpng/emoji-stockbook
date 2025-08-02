export type Emojiset = EmojiCategory[];

export interface EmojiCategory {
  id: string;
  name: string;
  emojis: Emoji[];
}

export interface Emoji {
  char: string;
  shortcode: string;
  keywords?: string[];
  version: number;
  variants?: EmojiVariant[];
}

export interface EmojiVariant {
  char: string;
  version: number;
}

export const emojiJsonTypeDef = `type Emojiset = EmojiCategory[];

interface EmojiCategory {
  id: string;
  name: string;
  emojis: Emoji[];
}

interface Emoji {
  char: string;
  shortcode: string;
  keywords?: string[];
  version: number;
  variants?: EmojiVariant[];
}

interface EmojiVariant {
  char: string;
  version: number;
}

declare const data: Emojiset;

export default data;`;
