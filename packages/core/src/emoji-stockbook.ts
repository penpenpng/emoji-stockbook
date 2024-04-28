import "./components/emoji-palette.js";
import "./components/search-input.js";

import type { EmojiDataset } from "@emoji-stockbook/types";
import { provide } from "@lit/context";
import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

import styles from "./emoji-stockbook.css?inline";
import { stockbookContext } from "./lib/context.js";
import { Stockbook } from "./lib/stockbook.js";

/**
 * TODO: https://api-viewer.open-wc.org/docs/guide/writing-jsdoc/
 */
@customElement("emoji-stockbook")
export class EmojiStockbook extends LitElement {
  @property({ type: Number, attribute: "col" })
  col = 9;

  @property({ type: Number, attribute: "cell-size" })
  cellSize = 32;

  @property({ type: Number, attribute: "cell-gap" })
  cellGap = 4;

  setEmojiDataset(data: EmojiDataset) {
    this.stockbook.setRepositoryData(data);
  }

  @provide({ context: stockbookContext })
  stockbook = new Stockbook();

  /**
   * Width of the component. If not given, CSS variable `--emoji-stockbook-width`
   * determines the width. If neither is given, implicit default width is used.
   */
  @property({ type: Number, attribute: "width" })
  width?: number;

  render() {
    return html`<esb-search-input></esb-search-input>
      <esb-emoji-palette></esb-emoji-palette>
      <style>
        ${this.#dynamicStyle()}
      </style>`;
  }

  /*
    To handle arrow key events, col must be accepted
    as an attribute, not a CSS variable.
    Therefore, all style variables that have dependencies
    with col will be handled by JavaScript.
  */
  #dynamicStyle() {
    // --esb prefix means that the variable is private.
    const styles = css`
      :host {
        width: var(--emoji-stockbook-width, ${this.#defaultWidth}px);

        --esb-col: ${this.col};
        --esb-cell-size: ${this.cellSize}px;
        --esb-cell-gap: ${this.cellGap}px;
      }
    `;
    const widthCSS = this.width
      ? css`
          :host {
            width: ${this.width}px;
          }
        `
      : css``;

    return css`
      ${styles}${widthCSS}
    `;
  }

  get #defaultWidth() {
    const padding = 20;
    return (
      (this.cellSize + this.cellGap) * this.col - this.cellGap + padding * 2
    );
  }

  static styles = unsafeCSS(styles);
}

declare global {
  interface HTMLElementTagNameMap {
    "emoji-stockbook": EmojiStockbook;
  }
}
