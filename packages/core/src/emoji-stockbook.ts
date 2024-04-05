import type { StockbookData } from "@emoji-stockbook/types";
import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

import { stockbookMain } from "./components/stockbook-main.js";
import style from "./emoji-stockbook.css?inline";

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
    const vars = this.#renderDynamicStyles();

    return html`${main}${vars}`;
  }

  #renderDynamicStyles() {
    const vars = css`
      :host {
        --col: ${this.col};
        --cell-size: ${this.cellSize}px;
        --cell-gap: ${this.cellGap}px;
      }
    `;

    return html`<style>
      ${vars}
    </style>`;
  }

  static styles = unsafeCSS(style);
}

declare global {
  interface HTMLElementTagNameMap {
    "emoji-stockbook": EmojiStockbook;
  }
}
