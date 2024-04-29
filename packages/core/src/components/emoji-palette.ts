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
