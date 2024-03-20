export interface EmojiBase {
  /** It MUST be unique across EmojiGroups. If omitted, shortcode is assumed to be the ID. */
  id?: string;
  /** It SHOULD be unique across EmojiGroups. */
  shortcode: string;
  /** Keywords for search. */
  keywords?: string[];
}

export interface NativeEmoji extends EmojiBase {
  /** Native emoji string. */
  char: string;
  /** Whether skin tone can be applied or not. */
  skinToneSupport?: boolean;
}

export interface CustomEmoji extends EmojiBase {
  /** Sprite URL. */
  src: string;
  /** Human-readable name. Only for a11y. */
  name?: string;
}

export type Emoji = NativeEmoji | CustomEmoji;

export interface EmojiGroup {
  name: string;
  emojis: Emoji[];
}

export type StockbookData = EmojiGroup[] | Emoji[];

export function isNativeEmoji(emoji: Emoji): emoji is NativeEmoji {
  return "char" in emoji;
}

export function isCustomEmoji(emoji: Emoji): emoji is CustomEmoji {
  return "src" in emoji;
}

export function isEmojiGroups(x: EmojiGroup[] | Emoji[]): x is EmojiGroup[] {
  return x[0] && "emojis" in x[0];
}
