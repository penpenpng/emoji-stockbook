import type { EmojiCategory, Emoji, GlobalEmojiId } from "../../types";
import { useCustomElementProperty } from "../use-custom-element-property";
import { getEmojisetRegistry } from "../emojiset-registry";
import { UPromise } from "../utils";

export interface IEmojiRepository {
  readonly categories: Promise<EmojiCategory[]>;
  readonly emojis: Promise<Emoji[]>;
  getEmojiById(id: GlobalEmojiId): Promise<Emoji | undefined>;
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

  async getEmojiById(id: GlobalEmojiId): Promise<Emoji | undefined> {
    const reg = getEmojisetRegistry();
    const [emojiset, emojiId] = id;

    if (this.props.emojisets.includes(emojiset)) {
      const emoji = await reg.getEmojiById(emojiset, emojiId);
      return emoji;
    } else {
      return undefined;
    }
  }
}
