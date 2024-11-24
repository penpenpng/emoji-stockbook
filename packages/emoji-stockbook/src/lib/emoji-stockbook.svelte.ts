import type { Emoji, EmojiGroup } from "@emoji-stockbook/types";
import type {
  ContentType,
  IEmojiStockbook,
  NormalizedEmoji,
  NormalizedEmojiGroup,
} from "../types";
import { Repository } from "./repository";
import { CursorController } from "./cursor-controller.svelte";
import { HoverController } from "./hover-controller.svelte";
import { getContext, setContext } from "svelte";
import { SearchController } from "./search-controller.svelte";
import { EventController } from "./event-controller";

class EmojiStockbook implements IEmojiStockbook {
  repo = new Repository();
  search = new SearchController(this.repo);
  cursor = new CursorController(this.repo);
  hover = new HoverController();
  event = new EventController();

  visible = $state(false);
  contentType = $state<ContentType>("flat");

  private defaultGroups = $state<NormalizedEmojiGroup[]>([]);
  groups = $derived<NormalizedEmojiGroup[]>(
    this.search.isSearchMode ? this.search.groups : this.defaultGroups,
  );

  setEmojiDataset(dataset: Emoji[] | EmojiGroup[]): void {
    this.repo.setEmojiDataset(dataset);
    this.resetState();
  }
  show() {
    this.visible = true;
    this.event.emitter.emit("show");
  }
  hide() {
    this.visible = false;
    this.event.emitter.emit("hide");
    this.resetState();
  }
  resetState(): void {
    this.contentType = this.repo.isGroupedExplicitly() ? "grouped" : "flat";
    this.search.leaveSearchMode();
    this.cursor.unsetCursor();
    this.hover.unsetHover();
    this.defaultGroups = this.repo.getAllEmojiGroups();
  }

  onClickEmojiButton(emoji: NormalizedEmoji) {
    this.event.emitter.emit("input", emoji);
    this.hide();
  }
}

const contextKey = Symbol();

export const getEmojiStockbookContext = (): IEmojiStockbook => {
  return getContext(contextKey);
};

export const createEmojiStockbookContext = (): IEmojiStockbook => {
  const stockbook = new EmojiStockbook();
  setContext(contextKey, stockbook);
  return stockbook;
};
