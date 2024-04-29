import "./emoji-button.js";
import "./accordion.js";

import { isNativeEmoji } from "@emoji-stockbook/types";
import { html, LitElement, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

import { privateCustomElement } from "../lib/private-component.js";
import type { EmojiModel } from "../lib/stockbook.js";
import style from "./emoji-grid.css?inline";

@privateCustomElement("emoji-grid")
export class EmojiGrid extends LitElement {
  @property({ type: String, attribute: false })
  name = "";

  @property({ type: Array, attribute: false })
  emojis: EmojiModel[] = [];

  render() {
    const content = html`<div class="grid">
      ${repeat(
        this.emojis,
        (emoji) => emoji.id,
        (emoji) =>
          isNativeEmoji(emoji)
            ? html`<esb-native-emoji-button
                char=${emoji.char}
              ></esb-native-emoji-button>`
            : html`<esb-custom-emoji-button
                alt=${emoji.name ?? emoji.shortcode}
                src=${emoji.src}
              ></esb-custom-emoji-button>`
      )}
    </div>`;

    if (this.name) {
      return html`<esb-accordion>
        <div slot="label">${this.name}</div>
        <div slot="content">${content}</div>
      </esb-accordion>`;
    } else {
      return content;
    }
  }

  static styles = unsafeCSS(style);
}
