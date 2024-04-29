import "./accordion.js";
import "../components/emoji-grid.js";

import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";

import { privateCustomElement } from "../lib/private-component.js";
import { EmojiModel } from "../lib/stockbook.js";

@privateCustomElement("emoji-group-section")
export class EmojiGroupSection extends LitElement {
  @property({ type: String })
  name = "";

  @property({ type: Array, attribute: false })
  emojis: EmojiModel[] = [];

  render() {
    return html`<esb-accordion label=${this.name}>
      <div slot="content">
        <esb-emoji-grid .emojis=${this.emojis}></esb-emoji-grid>
      </div>
    </esb-accordion>`;
  }
}
