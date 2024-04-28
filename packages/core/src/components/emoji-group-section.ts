import "./accordion.js";

import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";

import {
  createFactory,
  privateCustomElement,
} from "../lib/private-component.js";
import { EmojiGroupModel, EmojiModel } from "../lib/stockbook.js";
import { emojiGrid } from "./emoji-grid.js";

@privateCustomElement("emoji-group-section")
class EmojiGroupSection extends LitElement implements EmojiGroupSectionProps {
  @property({ type: String })
  name = "";

  @property({ type: Array, attribute: false })
  emojis: EmojiModel[] = [];

  render() {
    return html`<esb-accordion label=${this.name}>
      <div slot="content">
        ${emojiGrid({
          emojis: this.emojis,
        })}
      </div>
    </esb-accordion>`;
  }
}

export type EmojiGroupSectionProps = EmojiGroupModel;

export const emojiGroupSection = createFactory<
  EmojiGroupSection,
  EmojiGroupSectionProps
>(EmojiGroupSection);
