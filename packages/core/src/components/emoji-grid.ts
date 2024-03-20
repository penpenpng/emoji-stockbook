import { type Emoji } from "@emoji-stockbook/types";
import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

import { definePrivateComponent } from "../lib/private-component.js";
import { emojiButton } from "./emoji-button.js";

class EmojiGrid extends LitElement implements EmojiGridProps {
  @property({ type: Array, attribute: false })
  emojis: Emoji[] = [];

  render() {
    return html`<div>
      ${repeat(
        this.emojis,
        (emoji) => emoji.id ?? emoji.shortcode,
        (emoji) => emojiButton({ emoji })
      )}
    </div>`;
  }
}

export interface EmojiGridProps {
  emojis: Emoji[];
}

export const emojiGrid = definePrivateComponent<EmojiGrid, EmojiGridProps>(
  EmojiGrid
);
