import {
  type Emoji,
  type EmojiDataset,
  isEmojiGroups,
  isNativeEmoji,
} from "@emoji-stockbook/types";

export class Stockbook {
  #repo = new EmojiRepository();

  constructor() {
    this.#palette = this.#repo.getAll();
  }

  setRepositoryData(data: EmojiDataset) {
    this.#repo.setData(data);
  }

  search(query: string): Readonly<PaletteModel> {
    return (this.palette = {
      kind: "emojis",
      emojis: this.#repo.search(query),
    });
  }

  #palette: PaletteModel;
  private set palette(v: PaletteModel) {
    this.#palette = v;
  }
  get palette(): Readonly<PaletteModel> {
    return this.#palette;
  }
}

export class EmojiRepository {
  #data: PaletteModel = { kind: "emojis", emojis: [] };
  #map: Record<string, EmojiModel> = {};

  setData(data: EmojiDataset) {
    const map: Record<string, EmojiModel> = {};

    if (isEmojiGroups(data)) {
      const groups: EmojiGroupModel[] = [];

      for (const { name, emojis } of data) {
        const emojiModels = EmojiRepository.#modelizeWithMemoizing(emojis, map);

        groups.push({
          name,
          emojis: emojiModels,
        });
      }

      this.#data = {
        kind: "groups",
        groups,
      };
    } else {
      const emojiModels = EmojiRepository.#modelizeWithMemoizing(data, map);

      this.#data = {
        kind: "emojis",
        emojis: emojiModels,
      };
    }

    this.#map = map;
  }

  static #modelizeWithMemoizing(
    emojis: Emoji[],
    map: Record<string, EmojiModel>
  ): EmojiModel[] {
    const emojiModels: EmojiModel[] = [];

    for (const emoji of emojis) {
      const emojiModel = modelize(emoji);
      emojiModels.push(emojiModel);

      // memoize
      if (map[emojiModel.id]) {
        console.warn(
          `Emoji IDs are duplicated: ${emojiModel.id}\nThis may lead to unexpected behavior.`
        );
      }
      map[emojiModel.id] = emojiModel;
    }

    return emojiModels;
  }

  getAll(): PaletteModel {
    return this.#data;
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
