import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

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
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0;

  render() {
    return html`
      <button @click=${this._onClick} part="button">
        count is ${this.count}
      </button>
    `;
  }

  private _onClick() {
    this.count++;
  }

  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    "emoji-stockbook": EmojiStockbook;
  }
}
