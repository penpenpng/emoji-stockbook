import { html, LitElement, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";

import { privateCustomElement } from "../lib/private-component.js";
import styles from "./emoji-button.css?inline";

@privateCustomElement("native-emoji-button")
export class NativeEmojiButton extends LitElement {
  @property({ type: String })
  char = "";

  render() {
    return html`<button><span>${this.char}</span></button>`;
  }

  static styles = unsafeCSS(styles);
}

@privateCustomElement("custom-emoji-button")
export class CustomEmojiButton extends LitElement {
  @property({ type: String })
  src = "";

  @property({ type: String })
  alt = "";

  render() {
    return html`<button>
      <img alt=${this.alt} src=${this.src} />
    </button>`;
  }

  static styles = unsafeCSS(styles);
}
