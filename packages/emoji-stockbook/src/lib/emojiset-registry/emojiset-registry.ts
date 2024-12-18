import type {
  ValueOrGetter,
  MaybePromise,
  Emojiset,
  EmojiCategory,
  Emoji,
} from "../../types";
import { Logger } from "../logger";
import { UPromise } from "../utils";
import { nativeEmojiset } from "./native-emojisets";

export interface IEmojisetRegistry {
  addEmojiset(
    key: string,
    emojiset: ValueOrGetter<MaybePromise<Emojiset>>,
  ): void;
  getEmojiset(key: string): Promise<Emojiset>;
  removeEmojiset(key: string): boolean;
  getEmojiCategories(keys: string[]): Promise<EmojiCategory[]>;
  getEmojiById(keys: string[], id: string): Promise<Emoji | undefined>;
  getEmojiByIds(keys: string[], ids: string[]): Promise<Emoji[]>;
}

export class EmojiRegistry implements IEmojisetRegistry {
  private emojisets: Record<string, ValueOrGetter<MaybePromise<Emojiset>>> = {};

  constructor() {
    // TODO: バージョンごとに登録する。とりあえず2種類作って試す
    // TODO: バージョンを増やしたら emojisets property のデフォルト値も直しておく
    this.addEmojiset("native", nativeEmojiset("native"));
  }

  // TODO: 入力によりゆるい形式を許す
  addEmojiset(
    key: string,
    emojiset: ValueOrGetter<MaybePromise<Emojiset>>,
  ): void {
    this.emojisets[key] = emojiset;
  }

  async getEmojiset(key: string): Promise<Emojiset> {
    const valueOrGetter = this.emojisets[key];

    if (!valueOrGetter) {
      Logger.error(
        `Emojiset "${key}" was requested but not found. You need to call getEmojisetRegistry().addEmojiset(key, emojiset) before the use.`,
      );
      throw new Error();
    }

    try {
      if (typeof valueOrGetter === "function") {
        const value = await valueOrGetter();
        return value;
      } else {
        const value = await valueOrGetter;
        return value;
      }
    } catch (err) {
      Logger.error(`An error occurred while getting emojiset "${key}".`, err);
      throw err;
    }
  }

  removeEmojiset(key: string): boolean {
    if (key in this.emojisets) {
      delete this.emojisets[key];
      return true;
    }
    return false;
  }

  async getEmojiCategories(keys: string[]): Promise<EmojiCategory[]> {
    const categories: Record<string, EmojiCategory> = {};

    for (const key of keys) {
      try {
        const emojiset = await this.getEmojiset(key);
        for (const cat of emojiset.categories) {
          categories[cat.id] = merge(categories[cat.id], cat);
        }
      } catch {
        // noop
      }
    }

    // TODO: id に重複があったら警告を表示する

    return Object.values(categories);
  }

  async getEmojiById(keys: string[], id: string): Promise<Emoji | undefined> {
    const search = async (key: string): Promise<Emoji> => {
      const emojiset = await this.getEmojiset(key);

      for (const cat of emojiset.categories) {
        for (const emoji of cat.emojis) {
          if (emoji.id === id) {
            return emoji;
          }
        }
      }

      // Not found. This error will be caught.
      throw new Error();
    };

    const task = UPromise.first(keys.map(search));

    try {
      const result = await task;
      return result;
    } catch {
      return undefined;
    }
  }

  async getEmojiByIds(keys: string[], ids: string[]): Promise<Emoji[]> {
    // TODO
  }
}

function merge(a: EmojiCategory | undefined, b: EmojiCategory): EmojiCategory {
  if (!a) {
    return b;
  }
  if (a.id !== b.id) {
    // Cannot merge. This error will be caught.
    throw new Error();
  }

  if (a.kind === "custom" && b.kind === "custom") {
    return {
      ...a,
      emojis: [...a.emojis, ...b.emojis],
    };
  } else if (a.kind === "native" && b.kind === "native") {
    return {
      ...a,
      emojis: [...a.emojis, ...b.emojis],
    };
  } else {
    // Cannot merge. This error will be caught.
    throw new Error();
  }
}
