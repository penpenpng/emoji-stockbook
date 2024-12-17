import type {
  SkintoneApplied,
  Emoji,
  NativeEmoji,
  CustomEmoji,
} from "../../types";

export interface ISkintoneFeature {
  readonly skintones: Skintone[];
  currentSkintone: Skintone | null;
  applySkintone(emoji: Emoji): SkintoneApplied<NativeEmoji> | CustomEmoji;
  reset(): void;
}

export interface Skintone {
  char: string;
  alt: string;
}

class State {
  skintones = $state.raw<Skintone[]>([]);
}

export class SkintoneFeature implements ISkintoneFeature {
  private state = new State();

  readonly skintones = $derived.by(() => this.state.skintones);
  currentSkintone = $state<Skintone | null>(null);

  applySkintone(emoji: Emoji): SkintoneApplied<NativeEmoji> | CustomEmoji {
    if (emoji.kind === "custom") {
      return emoji;
    }

    const skintone = this.currentSkintone?.char ?? null;

    if (emoji.supportsSkintone && skintone) {
      return {
        ...emoji,
        char: applySkintone(emoji.char, skintone),
        skintone: skintone,
        naked: emoji.char,
      };
    } else {
      return {
        ...emoji,
        skintone: null,
        naked: emoji.char,
      };
    }
  }

  reset() {
    // TODO ベタ書きでも今のところいいが後で直す
    this.state.skintones = [
      { char: "\u{1f3fb}", alt: "Light skin" },
      { char: "\u{1f3fc}", alt: "Medium light skin" },
      { char: "\u{1f3fd}", alt: "Medium skin" },
      { char: "\u{1f3fe}", alt: "Medium dark skin" },
      { char: "\u{1f3ff}", alt: "Dark skin" },
    ];
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
