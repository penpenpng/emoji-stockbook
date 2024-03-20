import type { StockbookData } from "@emoji-stockbook/types";
import { LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

import { stockbookMain } from "./components/stockbook-main.js";
import style from "./emoji-stockbook.css?inline";

/**
 * TODO: https://api-viewer.open-wc.org/docs/guide/writing-jsdoc/
 */
@customElement("emoji-stockbook")
export class EmojiStockbook extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  @property()
  docsHint = "Click on the Vite and Lit logos to learn more";

  /**
   * All native or custom emojis that user can choose.
   */
  @property({ type: Object })
  data: StockbookData = [];

  render() {
    return stockbookMain({ data: this.data });
  }

  static styles = unsafeCSS(style);
}

declare global {
  interface HTMLElementTagNameMap {
    "emoji-stockbook": EmojiStockbook;
  }
}
