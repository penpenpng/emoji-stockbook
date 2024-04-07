import "./components/emoji-palette.js";

import type { StockbookData } from "@emoji-stockbook/types";
import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createRef, ref } from "lit/directives/ref.js";

import type { EmojiPalette } from "./components/emoji-palette.js";
import styles from "./emoji-stockbook.css?inline";

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

  setEmojiDataset(data: StockbookData) {
    if (this.#paletteRef.value) {
      this.#paletteRef.value.data = data;
    }
  }

  #paletteRef = createRef<EmojiPalette>();

  /**
   * Width of the component. If not given, CSS variable `--emoji-stockbook-width`
   * determines the width. If neither is given, implicit default width is used.
   */
  @property({ type: Number, attribute: "width" })
  width?: number;

  render() {
    const styles = this.#renderDynamicStyles();

    return html`<esb-emoji-palette ${ref(this.#paletteRef)}></esb-emoji-palette
      >${styles}`;
  }

  /*
    To handle arrow key events, col must be accepted
    as an attribute, not a CSS variable.
    Therefore, all style variables that have dependencies
    with col will be handled by JavaScript.
  */
  #renderDynamicStyles() {
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

    return html`<style>
      ${styles}
      ${widthCSS}
    </style>`;
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
