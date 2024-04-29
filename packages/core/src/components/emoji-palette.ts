import "../components/emoji-group-section.js";
import "../components/emoji-grid.js";

import { html, LitElement, nothing } from "lit";
import { repeat } from "lit/directives/repeat.js";

import { PaletteConsumerController } from "../lib/context.js";
import { privateCustomElement } from "../lib/private-component.js";

@privateCustomElement("emoji-palette")
export class EmojiPalette extends LitElement {
  palette = new PaletteConsumerController(this);

  render() {
    const data = this.palette.value;
    if (!data) {
      return nothing;
    }

    if (data.kind === "groups") {
      return repeat(
        data.groups,
        (_, idx) => idx,
        (group) =>
          html`<esb-emoji-group-section
            .name=${group.name}
            .emojis=${group.emojis}
          ></esb-emoji-group-section>`
      );
    } else {
      return html`<esb-emoji-grid .emojis=${data.emojis}></esb-emoji-grid>`;
    }
  }
}
