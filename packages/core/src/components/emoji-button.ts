import {
  type Emoji,
  isCustomEmoji,
  isNativeEmoji,
} from "@emoji-stockbook/types";
import { html, LitElement, nothing, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";

import {
  createFactory,
  privateCustomElement,
} from "../lib/private-component.js";
import styles from "./emoji-button.css?inline";

@privateCustomElement("emoji-button")
class EmojiButton extends LitElement implements EmojiButtonProps {
  @property({ type: Object })
  emoji: Emoji | undefined;

  render() {
    const emoji = this.emoji;
    if (!emoji) {
      return html`<button></button>`;
    } else if (isNativeEmoji(emoji)) {
      return html`<button><span>${emoji.char}</span></button>`;
    } else if (isCustomEmoji(emoji)) {
      return html`<button>
        <img alt=${emoji.name ?? emoji.shortcode} src=${emoji.src} />
      </button>`;
    } else {
      return nothing;
    }
  }

  static styles = unsafeCSS(styles);
}

export interface EmojiButtonProps {
  emoji?: Emoji;
}

export const emojiButton = createFactory<EmojiButton, EmojiButtonProps>(
  EmojiButton
);
