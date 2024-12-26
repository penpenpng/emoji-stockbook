import { Logger } from "@/lib/logger";
import { pointsSame } from "@/lib/points-same";
import { UArray } from "@/lib/utils";
import type { EmojiSpecifier } from "@/types";

export interface IHistoryManager {
  updateHistory(pointer: EmojiSpecifier): void;
  getHistory(): HistoryRecord[];
  clearHistory(): void;
}

export interface HistoryRecord {
  pointer: EmojiSpecifier;
  count: number;
  updatedAt: number;
}

export class LocalStorageHistoryManager implements IHistoryManager {
  constructor(private localStorageKey: string = "_emoji-stockbook") {}

  updateHistory(pointer: EmojiSpecifier): void {
    try {
      const history = this.getHistory();

      // This may throw because the return value of `this.getHistory()` is not safe.
      updateHistory(history, pointer);

      window.localStorage.setItem(
        this.localStorageKey,
        JSON.stringify(history)
      );
    } catch (err) {
      Logger.warn("Failed to update emoji-stockbook history data.", err);
    }
  }

  getHistory(): HistoryRecord[] {
    try {
      return JSON.parse(
        window.localStorage.getItem(this.localStorageKey) ?? "[]"
      );
    } catch (err) {
      Logger.warn("Failed to load emoji-stockbook history data.", err);
      return [];
    }
  }

  clearHistory(): void {
    window.localStorage.removeItem(this.localStorageKey);
  }
}

export class InMemoryHistoryManager implements IHistoryManager {
  private history: HistoryRecord[] = [];

  updateHistory(pointer: EmojiSpecifier): void {
    updateHistory(this.history, pointer);
  }

  getHistory(): HistoryRecord[] {
    return this.history;
  }

  clearHistory(): void {
    this.history = [];
  }
}

function updateHistory(
  history: HistoryRecord[],
  pointer: EmojiSpecifier
): void {
  const record = history.find((e) => pointsSame(e.pointer, pointer));

  if (record) {
    UArray.put(history, (e) => pointsSame(e.pointer, pointer), {
      pointer,
      count: record.count + 1,
      updatedAt: Date.now(),
    });
  } else {
    history.push({
      pointer,
      count: 1,
      updatedAt: Date.now(),
    });
  }
}
