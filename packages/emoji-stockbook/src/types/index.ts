import type { Emoji } from "@emoji-stockbook/types";

export type ContentType = "flat" | "grouped";

export type NormalizedEmoji = Readonly<Emoji & { id: string }>;
export type NormalizedEmojiGroup = Readonly<{
  id: number;
  name: string;
  emojis: NormalizedEmoji[];
}>;

export type CursorPosition = {
  groupIndex: number;
  col: number;
  row: number;
};
export type CursorDirection =
  | "up"
  | "down"
  | "right"
  | "left"
  | "next"
  | "prev";
