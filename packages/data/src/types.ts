export interface Emoji {
  char: string;
  hexcode: string;
  shortcode: string;
  keywords?: string[];
  variants: EmojiVariant[];
  version: number;
}

export interface EmojiVariant {
  char: string;
  hexcode: string;
  version: number;
}
