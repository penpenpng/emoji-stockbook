import "./foldable.js";
import "./emoji-button.js";

import { html, LitElement, nothing, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

import { PaletteConsumerController } from "../lib/context.js";
import { privateCustomElement } from "../lib/private-component.js";
import { EmojiModel } from "../lib/stockbook.js";
import style from "./emoji-palette.css?inline";

@privateCustomElement("emoji-palette")
export class EmojiPalette extends LitElement {
  palette = new PaletteConsumerController(this);

  render() {
    const data = this.palette.value;
    if (!data) {
      return nothing;
    }

    const sections =
      data.kind === "groups"
        ? data.groups
        : [
            {
              name: "",
              emojis: data.emojis,
            },
          ];

    return repeat(
      sections,
      (_, idx) => idx,
      (group) =>
        html`<esb-emoji-grid
          .name=${group.name}
          .emojis=${group.emojis}
        ></esb-emoji-grid>`
    );
  }
}

@privateCustomElement("emoji-grid")
export class EmojiGrid extends LitElement {
  @property({ type: String, attribute: false })
  name = "";

  @property({ type: Array, attribute: false })
  emojis: EmojiModel[] = [];

  render() {
    return html`<esb-foldable ?enabled=${!!this.name} ?no-label=${!this.name}>
      <div slot="label">${this.name}</div>
      <div slot="content">
        <div div class="grid">
          ${this.emojis.map(
            (emoji) =>
              html`<esb-emoji-button .emoji=${emoji}></esb-emoji-button>`
          )}
        </div>
      </div>
    </esb-foldable>`;
  }

  static styles = unsafeCSS(style);
}
