import type { Emoji, EmojiCategory, EmojiSpecifier } from "../../types";
import { getEmojisetRegistry } from "../emojiset-registry";
import { Logger } from "../logger";
import { includeVersions } from "../native-emoji-versions";
import { useCustomElementProperty } from "../use-custom-element-property";

export interface IEmojiRepository {
  readonly categories: Promise<EmojiCategory[]>;
  readonly emojis: Promise<Emoji[]>;
  getEmojiByPointer(pointer: EmojiSpecifier): Promise<Emoji | undefined>;
}

export class EmojiRepository implements IEmojiRepository {
  private props = useCustomElementProperty();

  readonly categories = $derived.by(() => {
    const keys = this.props.emojisets;
    const reg = getEmojisetRegistry();
    return reg.getEmojiCategories(keys);
  });
  readonly emojis = $derived.by(() =>
    this.categories.then((cats) => cats.flatMap((c): Emoji[] => c.emojis))
  );

  async getEmojiByPointer(pointer: EmojiSpecifier): Promise<Emoji | undefined> {
    const reg = getEmojisetRegistry();
    const emojisets = this.props.emojisets;

    try {
      if (pointer.kind === "native") {
        const versions = includeVersions(pointer.version);

        for (const version of versions) {
          const emojiset = `${version}`;
          if (!reg.hasEmojiset(emojiset)) {
            continue;
          }

          if (pointer.original) {
            // variant native emoji

            // TODO: variant を pick できるようになったらここ直す
            Logger.error("not implemented yet");
            const original = await reg.getEmojiById(emojiset, pointer.original);
          } else {
            // naked native emoji
            return await reg.getEmojiById(emojiset, pointer.char);
          }
        }
      } else {
        if (emojisets.includes(pointer.emojiset)) {
          // custom emoji
          return await reg.getEmojiById(pointer.emojiset, pointer.id);
        }
      }
    } catch {
      // noop
    }

    return undefined;
  }
}
