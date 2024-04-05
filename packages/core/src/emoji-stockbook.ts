import type { StockbookData } from "@emoji-stockbook/types";
import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

import { stockbookMain } from "./components/stockbook-main.js";
import styles from "./emoji-stockbook.css?inline";

/**
 * TODO: https://api-viewer.open-wc.org/docs/guide/writing-jsdoc/
 */
@customElement("emoji-stockbook")
export class EmojiStockbook extends LitElement {
  /**
   * All native or custom emojis that user can choose.
   */
  @property({ type: Object })
  data: StockbookData = [];

  @property({ type: Number, attribute: "col" })
  col = 9;

  @property({ type: Number, attribute: "cell-size" })
  cellSize = 32;

  @property({ type: Number, attribute: "cell-gap" })
  cellGap = 4;

  render() {
    const main = stockbookMain({
      data: this.data,
    });
    const styles = this.#renderDynamicStyles();

    return html`${main}${styles}`;
  }

  /*
    To handle arrow key events, col must be accepted
    as an attribute, not a CSS variable.
    Therefore, all style variables that have dependencies
    with col will be handled by JavaScript.
  */
  #renderDynamicStyles() {
    const padding = 20;
    const defaultWidth =
      (this.cellSize + this.cellGap) * this.col - this.cellGap + padding * 2;

    // --esb prefix means that the variable is private.
    const styles = css`
      :host {
        width: var(--emoji-stockbook-width, ${defaultWidth}px);

        --esb-col: ${this.col};
        --esb-cell-size: ${this.cellSize}px;
        --esb-cell-gap: ${this.cellGap}px;
      }
    `;

    return html`<style>
      ${styles}
    </style>`;
  }

  static styles = unsafeCSS(styles);
}

declare global {
  interface HTMLElementTagNameMap {
    "emoji-stockbook": EmojiStockbook;
  }
}
