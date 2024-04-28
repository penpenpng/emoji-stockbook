import { LitElement, nothing } from "lit";
import { state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

import { privateCustomElement } from "../lib/private-component.js";
import type { PaletteModel } from "../lib/stockbook.js";
import { emojiGrid } from "./emoji-grid.js";
import { emojiGroupSection } from "./emoji-group-section.js";

@privateCustomElement("emoji-palette")
export class EmojiPalette extends LitElement {
  @state()
  private _data: PaletteModel | undefined;

  setEmojiDataset(data: PaletteModel) {
    this._data = data;
  }

  render() {
    const data = this._data;
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
