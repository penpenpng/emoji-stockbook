import { isEmojiGroups, type StockbookData } from "@emoji-stockbook/types";
import { LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

import { definePrivateComponent } from "../lib/private-component.js";
import { emojiGrid } from "./emoji-grid.js";
import { emojiGroupSection } from "./emoji-group-section.js";

class StockbookMain extends LitElement implements StockbookMainProps {
  @property({ type: Object, attribute: false })
  data: StockbookData | undefined;

  render() {
    const data = this.data;

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

export interface StockbookMainProps {
  data?: StockbookData;
}

export const stockbookMain = definePrivateComponent<
  StockbookMain,
  StockbookMainProps
>(StockbookMain);
