import type { IHistoryManager, HistoryRecord } from "../types";
import { put } from "./array";

export class LocalStorageHistoryManager implements IHistoryManager {
  constructor(private localStorageKey: string = "_emoji-stockbook") {}

  updateHistory(emojiId: string): void {
    try {
      const history = this.getHistory();

      // This may throw because the return value of `this.getHistory()` is not safe.
      updateHistory(history, emojiId);

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

  updateHistory(emojiId: string): void {
    updateHistory(this.history, emojiId);
  }

  getHistory(): HistoryRecord[] {
    return this.history;
  }

  clearHistory(): void {
    this.history = [];
  }
}

function updateHistory(history: HistoryRecord[], emojiId: string): void {
  const record = history.find((e) => e.emojiId === emojiId);

  if (record) {
    put(history, (e) => e.emojiId === emojiId, {
      emojiId,
      count: record.count + 1,
      updatedAt: Date.now(),
    });
  } else {
    history.push({
      emojiId,
      count: 1,
      updatedAt: Date.now(),
    });
  }
}
