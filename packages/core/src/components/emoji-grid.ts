import "./emoji-button.js";

import { type Emoji, isNativeEmoji } from "@emoji-stockbook/types";
import { html, LitElement, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

import {
  createFactory,
  privateCustomElement,
} from "../lib/private-component.js";
import style from "./emoji-grid.css?inline";

@privateCustomElement("emoji-grid")
class EmojiGrid extends LitElement implements EmojiGridProps {
  @property({ type: Array, attribute: false })
  emojis: Emoji[] = [];

  render() {
    return html`<div class="grid">
      ${repeat(
        this.emojis,
        (emoji) => emoji.id ?? emoji.shortcode,
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
  }

  static styles = unsafeCSS(style);
}

export interface EmojiGridProps {
  emojis: Emoji[];
}

export const emojiGrid = createFactory<EmojiGrid, EmojiGridProps>(EmojiGrid);
