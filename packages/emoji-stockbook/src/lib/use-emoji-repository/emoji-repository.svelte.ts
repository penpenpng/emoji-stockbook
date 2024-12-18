import type { EmojiCategory, Emoji } from "../../types";
import { useCustomElementProperty } from "../use-custom-element-property";
import { getEmojisetRegistry } from "../emojiset-registry";
import { UPromise } from "../utils";

export interface IEmojiRepository {
  readonly categories: Promise<EmojiCategory[]>;
  readonly emojis: Promise<Emoji[]>;
  getEmojiById(id: string): Promise<Emoji>;
  getEmojiByIds(ids: string[]): Promise<Emoji[]>;
}

export class EmojiRepository implements IEmojiRepository {
  private props = useCustomElementProperty();

  categories = $state(UPromise.never<EmojiCategory[]>());
  emojis = $state(UPromise.never<Emoji[]>());

  constructor() {
    $effect(() => {
      const keys = this.props.emojisets;
      const reg = getEmojisetRegistry();

      const cats = reg.getEmojiCategories(keys);

      // TODO: normalize
      this.categories = cats;
      this.emojis = cats.then((cats) => cats.flatMap((c): Emoji[] => c.emojis));
    });
  }

  // setEmojiDataset({ data, skintones }: EmojiRepositoryDataset): void {
  //   const groups = normalize(data);
  //   this.groups = groups;

  //   const emojis: Record<string, NormalizedEmoji> = {};
  //   for (const group of groups) {
  //     for (const emoji of group.emojis) {
  //       if (emojis[emoji.id]) {
  //         console.warn(
  //           `Emoji IDs are duplicated: ${emoji.id}\nThis may lead to unexpected behavior.`,
  //         );
  //       }

  //       emojis[emoji.id] = emoji;
  //     }
  //   }

  //   this.emojis = emojis;
  //   this.skintones = skintones;
  // }

  async getEmojiById(id: string): Promise<Emoji> {
    const reg = getEmojisetRegistry();
    const emoji = await reg.getEmojiById(this.props.emojisets, id);

    // The return value must not be undefined.
    return emoji!;
  }

  async getEmojiByIds(ids: string[]): Promise<Emoji[]> {
    const reg = getEmojisetRegistry();
    return reg.getEmojiByIds(this.props.emojisets, ids);
  }
}

// function normalize(dataset: Emoji[] | EmojiGroup[]): NormalizedEmojiGroup[] {
//   if (isEmojiGroups(dataset)) {
//     return toNormalizedEmojiGroups(dataset);
//   } else {
//     return toNormalizedEmojiGroups([
//       {
//         name: "",
//         emojis: dataset,
//       },
//     ]);
//   }
// }

// function toNormalizedEmojiGroups(raw: EmojiGroup[]): NormalizedEmojiGroup[] {
//   return raw.map((group, idx) => ({
//     ...group,
//     id: idx,
//     emojis: group.emojis.map(toNormalizedEmoji),
//   }));
// }

// function toNormalizedEmoji(raw: Emoji): NormalizedEmoji {
//   return {
//     ...raw,
//     id: raw.id ?? raw.shortcode,
//   };
// }
