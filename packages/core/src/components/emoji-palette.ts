import { LitElement, nothing } from "lit";
import { repeat } from "lit/directives/repeat.js";

import { PaletteConsumerController } from "../lib/context.js";
import { privateCustomElement } from "../lib/private-component.js";
import { emojiGrid } from "./emoji-grid.js";
import { emojiGroupSection } from "./emoji-group-section.js";

@privateCustomElement("emoji-palette")
export class EmojiPalette extends LitElement {
  palette = new PaletteConsumerController(this);

  render() {
    const data = this.palette.value;
    if (!data) {
      return nothing;
    }

    // TODO: performance
    if (data.kind === "groups") {
      return repeat(
        data.groups,
        (_, idx) => idx,
        (group) => emojiGroupSection(group)
      );
    } else {
      return emojiGrid({ emojis: data.emojis });
    }
  }
}
