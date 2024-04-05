import { type Emoji, EmojiGroup } from "@emoji-stockbook/types";
import { html, LitElement, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

import { definePrivateComponent } from "../lib/private-component.js";
import { emojiButton } from "./emoji-button.js";
import style from "./emoji-grid.css?inline";

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

export const emojiGrid = definePrivateComponent<EmojiGrid, EmojiGridProps>(
  EmojiGrid
);

class EmojiGroupSection extends LitElement implements EmojiGroupSectionProps {
  @property({ type: String })
  name = "";

  @property({ type: Array, attribute: false })
  emojis: Emoji[] = [];

  render() {
    return html`<span>${this.name}</span>${emojiGrid({
        emojis: this.emojis,
      })}`;
  }
}

export type EmojiGroupSectionProps = EmojiGroup;

export const emojiGroupSection = definePrivateComponent<
  EmojiGroupSection,
  EmojiGroupSectionProps
>(EmojiGroupSection);
