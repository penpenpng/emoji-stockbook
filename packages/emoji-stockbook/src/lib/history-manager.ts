import type { HistoryRecord } from "../types";

export interface IHistoryManager {
  updateHistory(emojiId: string): void;
  getHistory(): HistoryRecord[];
  clearHistory(): void;
}

// TODO
export class LocalStorageHistoryManager implements IHistoryManager {
  constructor(localStorageKey: string = "_emoji-stockbook") {}

  updateHistory(emojiId: string): void {}

  getHistory(): HistoryRecord[] {
    return [];
  }

  clearHistory(): void {}
}

export class InMemoryHistoryManager implements IHistoryManager {
  updateHistory(emojiId: string): void {}

  getHistory(): HistoryRecord[] {
    return [];
  }

  clearHistory(): void {}
}
