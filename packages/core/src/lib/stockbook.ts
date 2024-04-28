import {
  type Emoji,
  type EmojiDataset,
  isEmojiGroups,
  isNativeEmoji,
} from "@emoji-stockbook/types";

export class Stockbook {
  #repo = new EmojiRepository();
  #query = "";
  #defaultPalette: PaletteModel = {
    kind: "emojis",
    emojis: [],
  };

  setRepositoryData(data: EmojiDataset) {
    if (isEmojiGroups(data)) {
      const groups = data.map((group) => ({
        ...group,
        emojis: group.emojis.map(modelize),
      }));

      this.#defaultPalette = {
        kind: "groups",
        groups,
      };
      this.#repo.setData(this.#defaultPalette.groups.flatMap((g) => g.emojis));
    } else {
      this.#defaultPalette = {
        kind: "emojis",
        emojis: data.map(modelize),
      };
      this.#repo.setData(this.#defaultPalette.emojis);
    }

    if (this.#query) {
      this.search(this.#query);
    } else {
      this.palette = this.#defaultPalette;
    }
  }

  search(query: string): Readonly<PaletteModel> {
    this.#query = query;

    if (query) {
      return (this.palette = {
        kind: "emojis",
        emojis: this.#repo.search(query),
      });
    } else {
      return (this.palette = this.#defaultPalette);
    }
  }

  #palette: PaletteModel = {
    kind: "emojis",
    emojis: [],
  };
  private set palette(v: PaletteModel) {
    this.#palette = v;
    this.#paletteSubscriber.forEach((f) => f(this.#palette));
  }
  get palette(): Readonly<PaletteModel> {
    return this.#palette;
  }

  #paletteSubscriber: Subscriber<PaletteModel>[] = [];
  subscribePalette(callback: Subscriber<PaletteModel>): Unsubscribe {
    callback(this.palette);
    this.#paletteSubscriber.push(callback);

    return () => {
      this.#paletteSubscriber = this.#paletteSubscriber.filter(
        (f) => f !== callback
      );
    };
  }
}

class EmojiRepository {
  #map: Record<string, EmojiModel> = {};

  setData(emojis: EmojiModel[]) {
    const map: Record<string, EmojiModel> = {};
    for (const emoji of emojis) {
      // memoize
      if (map[emoji.id]) {
        console.warn(
          `Emoji IDs are duplicated: ${emoji.id}\nThis may lead to unexpected behavior.`
        );
      }
      map[emoji.id] = emoji;
    }

    this.#map = map;
  }

  getAll(): EmojiModel[] {
    return Object.values(this.#map);
  }

  getById(id: string): EmojiModel | undefined {
    return this.#map[id];
  }

  search(query: string): EmojiModel[] {
    const res: EmojiModel[] = [];

    for (const emoji of Object.values(this.#map)) {
      if (
        emoji.shortcode.includes(query) ||
        emoji.keywords?.some((keyword) => keyword.includes(query)) ||
        (isNativeEmoji(emoji) && emoji.char === query)
      ) {
        res.push(emoji);
      }
    }

    return res;
  }
}

function modelize(emoji: Emoji): EmojiModel {
  return { ...emoji, id: emoji.id ?? emoji.shortcode };
}

export type EmojiModel = Readonly<Emoji & { id: string }>;
// TODO: Readonly
export type PaletteModel =
  | {
      kind: "groups";
      groups: EmojiGroupModel[];
    }
  | {
      kind: "emojis";
      emojis: EmojiModel[];
    };
// TODO: Readonly
export type EmojiGroupModel = {
  name: string;
  emojis: EmojiModel[];
};

export type Subscriber<T> = (v: T) => void;
export type Unsubscribe = () => void;
