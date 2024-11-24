import {
  type Emoji,
  type EmojiGroup,
  isEmojiGroups,
  isNativeEmoji,
} from "@emoji-stockbook/types";
import type {
  IRepository,
  NormalizedEmoji,
  NormalizedEmojiGroup,
} from "../types";

export class Repository implements IRepository {
  private isGrouped = false;
  private emojis: Record<string, NormalizedEmoji> = {};
  private groups: NormalizedEmojiGroup[] = [];

  setEmojiDataset(dataset: Emoji[] | EmojiGroup[]): void {
    this.isGrouped = isEmojiGroups(dataset);

    const groups = normalize(dataset);
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
