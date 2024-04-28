import { html, LitElement } from "lit";

import { SearchController } from "../lib/context.js";
import { privateCustomElement } from "../lib/private-component.js";

@privateCustomElement("search-input")
export class SearchInput extends LitElement {
  searchController = new SearchController(this);

  render() {
    return html`<input
      type="text"
      .value=${this.searchController.query}
      @input=${this.onInputQuery}
    />`;
  }

  onInputQuery(ev: Event & { target: HTMLInputElement }) {
    this.searchController.search(ev.target.value);
  }
}
