import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import { randomId } from "../lib/random-id.js";

@customElement("esb-accordion")
export class Accordion extends LitElement {
  @property({ type: String })
  label = "";

  @property({ type: Boolean, reflect: true })
  expanded = true;

  #invokerId = randomId();
  #contentId = randomId();

  render() {
    return html`
      <section>
        <h3
          id=${this.#invokerId}
          aria-controls=${this.#contentId}
          aria-expanded=${this.expanded ? "true" : "false"}
        >
          <button @click=${this.toggle}>${this.label}</button>
        </h3>
        <div
          id=${this.#contentId}
          role="region"
          aria-labelledby=${this.#invokerId}
          ?hidden=${!this.expanded}
        >
          <slot name="content"></slot>
        </div>
      </section>
    `;
  }

  toggle() {
    this.expanded = !this.expanded;
  }
}