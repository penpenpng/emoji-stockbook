import type {
  ValueOrGetter,
  MaybePromise,
  Emojiset,
  EmojiCategory,
  Emoji,
  EmojisetInput,
} from "../../types";
import { Logger } from "../logger";
import { makeEmojiset } from "./make-emojiset";
import { nativeEmojiset } from "./native-emojisets";

export interface IEmojisetRegistry {
  /**
   * Registers an emojiset tied to a given key. Emojiset is allowed in raw value, Promise, or function form.
   * This enables a custom element given the key to load the emojiset.
   *
   * When you use a function format, the loading emojiset is delayed until just before rendering of emoji-stockbook.
   * If the loading process includes fetching over network, the lazy loading helps reduce communication.
   * However, note that it also affects the time it takes to render.
   *
   * **Hint**:
   * Ideally, asset data should be cached locally, since emoji data sets are generally large.
   * It is the best practice to give an emojiset as a promise, which is resolved from cache,
   * or after fetching asset data.
   */
  addEmojiset(key: string, emojiset: EmojisetResolver): void;
  /**
   * Retrieve an emojiset.
   *
   * This method is normally called from a custom element, but can also be called directly by developer.
   */
  getEmojiset(key: string): Promise<Emojiset>;
  /**
   * Returns whether or not the emojiset exists.
   */
  hasEmojiset(key: string): boolean;
  /**
   * Return all emojiset keys.
   */
  getEmojisetList(): string[];
  /**
   * Remove an emojiset.
   *
   * If any emojiset is removed, it return `true`.
   */
  removeEmojiset(key: string): boolean;
  /**
   * Retrieve emoji categories by the given keys.
   * If categories with the same name exist between emojisets, they will be merged.
   *
   * This method is normally called from a custom element, but can also be called directly by developer.
   */
  getEmojiCategories(keys: string[]): Promise<EmojiCategory[]>;
  /**
   * Retrieve emoji by the given ID.
   *
   * This method is normally called from a custom element, but can also be called directly by developer.
   */
  getEmojiById(key: string, id: string): Promise<Emoji | undefined>;
}

/** Format that can be registered in EmojiRegistry. */
export type EmojisetResolver = ValueOrGetter<MaybePromise<EmojisetInput>>;

export class EmojiRegistry implements IEmojisetRegistry {
  private emojisets: Record<string, EmojisetResolver> = {};

  constructor() {
    // TODO: バージョンを増やしたら emojisets property のデフォルト値も直しておく
    this.addEmojiset("1", nativeEmojiset("1"));
    this.addEmojiset("16", nativeEmojiset("16"));
  }

  addEmojiset(key: string, emojiset: EmojisetResolver): void {
    this.emojisets[key] = emojiset;
  }

  async getEmojiset(key: string): Promise<Emojiset> {
    const emojiset = this.emojisets[key];

    if (!emojiset) {
      Logger.error(
        `Emojiset "${key}" was requested but not found. You need to call getEmojisetRegistry().addEmojiset(key, emojiset) before the use.`,
      );
      throw new Error();
    }

    try {
      return makeEmojiset(key, await resolveEmojiset(emojiset));
    } catch (err) {
      Logger.error(`An error occurred while getting emojiset "${key}".`, err);
      throw err;
    }
  }

  hasEmojiset(key: string): boolean {
    return !!this.emojisets[key];
  }

  getEmojisetList(): string[] {
    return Object.keys(this.emojisets);
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
          categories[cat.id] = mergeEmojiCategories(categories[cat.id], cat);
        }
      } catch {
        // noop
      }
    }

    return Object.values(categories);
  }

  async getEmojiById(key: string, id: string): Promise<Emoji | undefined> {
    const emojiset = await this.getEmojiset(key);

    for (const cat of emojiset.categories) {
      for (const emoji of cat.emojis) {
        if (emoji.id === id) {
          return emoji;
        }
      }
    }

    return undefined;
  }
}

async function resolveEmojiset(
  resolver: EmojisetResolver,
): Promise<EmojisetInput> {
  if (typeof resolver === "function") {
    return resolver();
  } else {
    return resolver;
  }
}

function mergeEmojiCategories(
  a: EmojiCategory | undefined,
  b: EmojiCategory,
): EmojiCategory {
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
