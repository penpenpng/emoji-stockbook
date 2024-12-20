import type { GlobalEmojiId } from "../types";
import { isSameEmojiId } from "./global-emoji-id";
import { UArray } from "./utils";

export interface IHistoryManager {
  updateHistory(id: GlobalEmojiId): void;
  getHistory(): HistoryRecord[];
  clearHistory(): void;
}

export interface HistoryRecord {
  id: GlobalEmojiId;
  count: number;
  updatedAt: number;
}

export class LocalStorageHistoryManager implements IHistoryManager {
  constructor(private localStorageKey: string = "_emoji-stockbook") {}

  updateHistory(id: GlobalEmojiId): void {
    try {
      const history = this.getHistory();

      // This may throw because the return value of `this.getHistory()` is not safe.
      updateHistory(history, id);

      window.localStorage.setItem(
        this.localStorageKey,
        JSON.stringify(history),
      );
    } catch {
      // noop
    }
  }

  getHistory(): HistoryRecord[] {
    try {
      return JSON.parse(
        window.localStorage.getItem(this.localStorageKey) ?? "[]",
      );
    } catch {
      return [];
    }
  }

  clearHistory(): void {
    window.localStorage.removeItem(this.localStorageKey);
  }
}

export class InMemoryHistoryManager implements IHistoryManager {
  private history: HistoryRecord[] = [];

  updateHistory(id: GlobalEmojiId): void {
    updateHistory(this.history, id);
  }

  getHistory(): HistoryRecord[] {
    return this.history;
  }

  clearHistory(): void {
    this.history = [];
  }
}

function updateHistory(history: HistoryRecord[], id: GlobalEmojiId): void {
  const record = history.find((e) => isSameEmojiId(e.id, id));

  if (record) {
    UArray.put(history, (e) => isSameEmojiId(e.id, id), {
      id,
      count: record.count + 1,
      updatedAt: Date.now(),
    });
  } else {
    history.push({
      id,
      count: 1,
      updatedAt: Date.now(),
    });
  }
}
