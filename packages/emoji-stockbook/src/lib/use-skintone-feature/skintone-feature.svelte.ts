import type { Skintone } from "@emoji-stockbook/types";
import { useEmojiRepository } from "../use-emoji-repository";
import type {
  NormalizedEmoji,
  SkintoneAppliedNativeEmoji,
  NormalizedCustomEmoji,
} from "../../types";

export interface ISkintoneFeature {
  readonly skintones: Skintone[];
  currentSkintone: Skintone | null;
  applySkintone(
    emoji: NormalizedEmoji,
  ): SkintoneAppliedNativeEmoji | NormalizedCustomEmoji;
  reset(): void;
}

class State {
  skintones = $state.raw<Skintone[]>([]);
}

export class SkintoneFeature implements ISkintoneFeature {
  private state = new State();
  private repo = useEmojiRepository();

  readonly skintones = $derived.by(() => this.state.skintones);
  currentSkintone = $state<Skintone | null>(null);

  applySkintone(
    emoji: NormalizedEmoji,
  ): SkintoneAppliedNativeEmoji | NormalizedCustomEmoji {
    if ("src" in emoji) {
      return emoji;
    }

    const skintone = this.currentSkintone?.char ?? null;

    if (emoji.skinToneSupport && skintone) {
      return {
        ...emoji,
        char: applySkintone(emoji.char, skintone),
        appliedSkintone: skintone,
        naked: emoji.char,
      };
    } else {
      return {
        ...emoji,
        appliedSkintone: null,
        naked: emoji.char,
      };
    }
  }

  reset() {
    this.state.skintones = this.repo.getSkintones();
    this.currentSkintone = null;
  }
}

function applySkintone(emoji: string, skintone: string): string {
  // Zero Width Joiner
  const zwj = (() => {
    // Hand Shake 🧑‍🤝‍🧑
    if (emoji.includes("\u200d\ud83e\udd1d\u200d")) {
      return "\u200d\ud83e\udd1d\u200d";
    }

    return "\u200D";
  })();

  const parts = emoji.split(zwj);

  const modifiedParts = parts.map((part) => {
    const basePart = part.replace(/\p{Emoji_Modifier}/gu, "");

    if (/\p{Emoji_Modifier_Base}/u.test(basePart)) {
      return basePart.replace(
        /(\p{Extended_Pictographic}+)(\uFE0F?)/u,
        `$1${skintone}`,
      );
    }
    return part;
  });

  return modifiedParts.join(zwj);
}
