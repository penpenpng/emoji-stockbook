import { type EmojiDataset, isEmojiGroups } from "@emoji-stockbook/types";
import { LitElement, nothing } from "lit";
import { state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

import { privateCustomElement } from "../lib/private-component.js";
import { emojiGrid } from "./emoji-grid.js";
import { emojiGroupSection } from "./emoji-group-section.js";

@privateCustomElement("emoji-palette")
export class EmojiPalette extends LitElement {
  @state()
  private _data: EmojiDataset | undefined;

  setEmojiDataset(data: EmojiDataset) {
    this._data = data;
  }

  render() {
    const data = this._data;

    // TODO: performance
    if (!data || data.length <= 0) {
      return nothing;
    } else if (isEmojiGroups(data)) {
      return repeat(
        data,
        (_, idx) => idx,
        (group) => emojiGroupSection(group)
      );
    } else {
      return emojiGrid({ emojis: data });
    }
  }
}
