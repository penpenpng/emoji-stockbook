import type {
  Emoji,
  EmojiGroup,
  EmojiRepositoryDataset,
  Skintone,
} from "@emoji-stockbook/types";
import { isEmojiGroups } from "@emoji-stockbook/types";
import type { NormalizedEmoji, NormalizedEmojiGroup } from "../../types";

export interface IEmojiRepository {
  setEmojiDataset(dataset: EmojiRepositoryDataset): void;
  isGroupedExplicitly(): boolean;
  getAllEmojiGroups(): NormalizedEmojiGroup[];
  getEmojiGroupByIndex(index: number): NormalizedEmojiGroup | undefined;
  getAllEmojis(): NormalizedEmoji[];
  getEmojiById(id: string): NormalizedEmoji | undefined;
  getSkintones(): Skintone[];
}

export class EmojiRepository implements IEmojiRepository {
  private isGrouped = false;
  private emojis: Record<string, NormalizedEmoji> = {};
  private groups: NormalizedEmojiGroup[] = [];
  private skintones: Skintone[] = [];

  setEmojiDataset({ data, skintones }: EmojiRepositoryDataset): void {
    this.isGrouped = isEmojiGroups(data);

    const groups = normalize(data);
    this.groups = groups;

    const emojis: Record<string, NormalizedEmoji> = {};
    for (const group of groups) {
      for (const emoji of group.emojis) {
        if (emojis[emoji.id]) {
          console.warn(
            `Emoji IDs are duplicated: ${emoji.id}\nThis may lead to unexpected behavior.`,
          );
        }

        emojis[emoji.id] = emoji;
      }
    }

    this.emojis = emojis;
    this.skintones = skintones;
  }
  isGroupedExplicitly(): boolean {
    return this.isGrouped;
  }
  getAllEmojiGroups(): NormalizedEmojiGroup[] {
    return this.groups;
  }
  getEmojiGroupByIndex(index: number): NormalizedEmojiGroup | undefined {
    return this.groups[index];
  }
  getAllEmojis(): NormalizedEmoji[] {
    return Object.values(this.emojis);
  }
  getEmojiById(id: string): NormalizedEmoji | undefined {
    return this.emojis[id];
  }
  getSkintones(): Skintone[] {
    return this.skintones;
  }
}

function normalize(dataset: Emoji[] | EmojiGroup[]): NormalizedEmojiGroup[] {
  if (isEmojiGroups(dataset)) {
    return toNormalizedEmojiGroups(dataset);
  } else {
    return toNormalizedEmojiGroups([
      {
        name: "",
        emojis: dataset,
      },
    ]);
  }
}

function toNormalizedEmojiGroups(raw: EmojiGroup[]): NormalizedEmojiGroup[] {
  return raw.map((group, idx) => ({
    ...group,
    id: idx,
    emojis: group.emojis.map(toNormalizedEmoji),
  }));
}

function toNormalizedEmoji(raw: Emoji): NormalizedEmoji {
  return {
    ...raw,
    id: raw.id ?? raw.shortcode,
  };
}
