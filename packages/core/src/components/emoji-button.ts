import { isNativeEmoji } from "@emoji-stockbook/types";
import { html, LitElement, nothing, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";

import { privateCustomElement } from "../lib/private-component.js";
import type { EmojiModel } from "../lib/stockbook.js";
import styles from "./emoji-button.css?inline";

@privateCustomElement("emoji-button")
export class EmojiButton extends LitElement {
  @property({ type: String, attribute: false })
  emoji?: EmojiModel;

  render() {
    const emoji = this.emoji;
    if (!emoji) {
      return nothing;
    }

    if (isNativeEmoji(emoji)) {
      return html`<button><span>${emoji.char}</span></button>`;
    } else {
      return html`<button>
        <img alt=${emoji.name ?? emoji.shortcode} src=${emoji.src} />
      </button>`;
    }
  }

  static styles = unsafeCSS(styles);
}
