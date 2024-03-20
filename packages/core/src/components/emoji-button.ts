import {
  type Emoji,
  isNativeEmoji,
  isCustomEmoji,
} from "@emoji-stockbook/types";
import { LitElement, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { privateCustomElement } from "../lib/private-custom-element";

@privateCustomElement("emoji-button")
export class EmojiButton extends LitElement {
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
