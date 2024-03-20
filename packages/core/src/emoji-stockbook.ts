import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { StockbookData } from "@emoji-stockbook/types";

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
    return html`${JSON.stringify(this.data)}`;
  }

  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    "emoji-stockbook": EmojiStockbook;
  }
}
