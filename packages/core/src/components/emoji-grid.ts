import { type Emoji } from "@emoji-stockbook/types";
import { html, LitElement, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

import {
  createFactory,
  privateCustomElement,
} from "../lib/private-component.js";
import { emojiButton } from "./emoji-button.js";
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
        (emoji) => emojiButton({ emoji })
      )}
    </div>`;
  }

  static styles = unsafeCSS(style);
}

export interface EmojiGridProps {
  emojis: Emoji[];
}

export const emojiGrid = createFactory<EmojiGrid, EmojiGridProps>(EmojiGrid);
