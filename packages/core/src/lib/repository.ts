import {
  type Emoji,
  type EmojiDataset,
  isEmojiGroups,
  isNativeEmoji,
} from "@emoji-stockbook/types";

export class EmojiRepository {
  #data: EmojiDatasetModel = { kind: "emojis", emojis: [] };
  #map: Record<string, EmojiModel> = {};

  constructor(data: EmojiDataset) {
    this.setData(data);
  }

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

  getAll(): EmojiDatasetModel {
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
export type EmojiDatasetModel =
  | {
      kind: "groups";
      groups: EmojiGroupModel[];
    }
  | {
      kind: "emojis";
      emojis: ReadonlyArray<EmojiModel>;
    };
export type EmojiGroupModel = Readonly<{
  name: string;
  emojis: ReadonlyArray<EmojiModel>;
}>;
