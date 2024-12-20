import type { EmojiCategory, Emoji, GlobalEmojiId } from "../../types";
import { useCustomElementProperty } from "../use-custom-element-property";
import { getEmojisetRegistry } from "../emojiset-registry";

export interface IEmojiRepository {
  readonly categories: Promise<EmojiCategory[]>;
  readonly emojis: Promise<Emoji[]>;
  getEmojiById(id: GlobalEmojiId): Promise<Emoji | undefined>;
}

export class EmojiRepository implements IEmojiRepository {
  private props = useCustomElementProperty();

  readonly categories = $derived.by(() => {
    const keys = this.props.emojisets;
    const reg = getEmojisetRegistry();
    return reg.getEmojiCategories(keys);
  });
  readonly emojis = $derived.by(() =>
    this.categories.then((cats) => cats.flatMap((c): Emoji[] => c.emojis)),
  );

  async getEmojiById(id: GlobalEmojiId): Promise<Emoji | undefined> {
    const reg = getEmojisetRegistry();

    try {
      const [emojiset, emojiId] = id;

      if (this.props.emojisets.includes(emojiset)) {
        const emoji = await reg.getEmojiById(emojiset, emojiId);
        return emoji;
      }
    } catch {
      // noop
    }

    return undefined;
  }
}
