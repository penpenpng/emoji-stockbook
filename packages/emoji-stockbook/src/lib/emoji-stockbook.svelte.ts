import type { Emoji, EmojiGroup } from "@emoji-stockbook/types";
import type {
  ContentType,
  IEmojiStockbook,
  NormalizedEmojiGroup,
} from "../types";
import { Repository } from "./repository";
import { CursorController } from "./cursor-controller.svelte";
import { HoverController } from "./hover-controller.svelte";
import { getContext, setContext } from "svelte";
import { SearchController } from "./search-controller.svelte";

class EmojiStockbook implements IEmojiStockbook {
  repo = new Repository();
  search = new SearchController(this.repo);
  cursor = new CursorController(this.repo);
  hover = new HoverController();

  contentType = $state<ContentType>("flat");

  private defaultGroups = $state<NormalizedEmojiGroup[]>([]);
  groups = $derived<NormalizedEmojiGroup[]>(
    this.search.isSearchMode ? this.search.groups : this.defaultGroups,
  );

  setEmojiDataset(dataset: Emoji[] | EmojiGroup[]): void {
    this.repo.setEmojiDataset(dataset);
    this.resetState();
  }
  resetState(): void {
    this.contentType = this.repo.isGroupedExplicitly() ? "grouped" : "flat";
    this.search.leaveSearchMode();
    this.cursor.unsetCursor();
    this.hover.unsetHover();
    this.defaultGroups = this.repo.getAllEmojiGroups();
  }
}

const contextKey = Symbol();

export const getEmojiStockbookContext = (): IEmojiStockbook => {
  return getContext(contextKey);
};

export const createEmojiStockbookContext = () => {
  const stockbook = new EmojiStockbook();
  setContext(contextKey, stockbook);
  return stockbook;
};
