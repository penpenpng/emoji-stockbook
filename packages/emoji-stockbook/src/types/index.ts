import type { Emoji, EmojiGroup } from "@emoji-stockbook/types";
import { Emitter } from "mitt";

export interface IEmojiStockbook {
  visible: boolean;
  contentType: ContentType;
  groups: NormalizedEmojiGroup[];
  repo: IRepository;
  search: ISearchController;
  cursor: ICursorController;
  hover: IHoverController;
  event: IEventController;
  setEmojiDataset(dataset: Emoji[] | EmojiGroup[]): void;
  show(): void;
  hide(): void;
  resetState(): void;
  onClickEmojiButton(emoji: NormalizedEmoji): void;
}

export interface IRepository {
  setEmojiDataset(dataset: Emoji[] | EmojiGroup[]): void;
  isGroupedExplicitly(): boolean;
  getAllEmojiGroups(): NormalizedEmojiGroup[];
  getEmojiGroupByIndex(index: number): NormalizedEmojiGroup | undefined;
  getAllEmojis(): NormalizedEmoji[];
  getEmojiById(id: string): NormalizedEmoji | undefined;
}

export interface ISearchController {
  isSearchMode: boolean;
  groups: NormalizedEmojiGroup[];
  searchEmojis(query: string): void;
  leaveSearchMode(): void;
}

export interface ICursorController {
  position: CursorPosition | undefined;
  cursoredContentId: string | undefined;
  setCursor(contentId: string): void;
  unsetCursor(): void;
  moveCursor(direction: CursorDirection): void;
}

export interface IHoverController {
  hoveredContentId: string | undefined;
  setHover(contentId: string): void;
  unsetHover(): void;
}

export interface IEventController {
  emitter: Emitter<EmojiStockbookEventMap>;
}

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

export type EmojiStockbookEventMap = {
  input: NormalizedEmoji;
  show: void;
  hide: void;
};
