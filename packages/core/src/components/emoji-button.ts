import {
  type Emoji,
  isCustomEmoji,
  isNativeEmoji,
} from "@emoji-stockbook/types";
import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";

import { definePrivateComponent } from "../lib/private-component.js";

export class EmojiButton extends LitElement implements EmojiButtonProps {
  @property({ type: Object })
  emoji: Emoji | undefined;

  render() {
    const emoji = this.emoji;
    if (!emoji) {
      return html`<button></button>`;
    } else if (isNativeEmoji(emoji)) {
      return html`<button>${emoji.char}</button>`;
    } else if (isCustomEmoji(emoji)) {
      return html`<button>
        <img alt=${emoji.name ?? emoji.shortcode} src=${emoji.src} />
      </button>`;
    } else {
      return nothing;
    }
  }
}

export interface EmojiButtonProps {
  emoji?: Emoji;
}

export const emojiButton = definePrivateComponent<
  EmojiButton,
  EmojiButtonProps
>(EmojiButton);
