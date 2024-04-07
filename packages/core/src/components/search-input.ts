import { html, LitElement } from "lit";

import { privateCustomElement } from "../lib/private-component.js";

@privateCustomElement("search-input")
export class SearchInput extends LitElement {
  render() {
    return html`<input type="text" />`;
  }
}
