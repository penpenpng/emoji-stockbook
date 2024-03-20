import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { StockbookData } from "@emoji-stockbook/types";
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
    return html`<span>${JSON.stringify(this.data)}</span>`;
  }

  static styles = unsafeCSS(style);
}

declare global {
  interface HTMLElementTagNameMap {
    "emoji-stockbook": EmojiStockbook;
  }
}
