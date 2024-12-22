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

export const emojiJsonTypeDef = `interface Emoji {
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

declare const data: Emoji[];

export default data;`;
