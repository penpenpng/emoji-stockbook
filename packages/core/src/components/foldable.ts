import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { when } from "lit/directives/when.js";

import { ariaBoolean, ifNeeded } from "../lib/directive.js";
import { privateCustomElement } from "../lib/private-component.js";
import { randomId } from "../lib/random-id.js";

@privateCustomElement("foldable")
export class Foldable extends LitElement {
  @property({ type: Boolean, reflect: true })
  enabled = true;

  @property({ type: Boolean, reflect: true, attribute: "no-label" })
  noLabel = false;

  @property({ type: Boolean, reflect: true })
  expanded = true;

  #invokerId = randomId();
  #contentId = randomId();

  render() {
    const header = this.noLabel
      ? nothing
      : html`<h3
          id=${ifNeeded(this.enabled, this.#invokerId)}
          aria-controls=${ifNeeded(this.enabled, this.#contentId)}
          aria-expanded=${ifNeeded(this.enabled, ariaBoolean(this.expanded))}
        >
          ${when(
            this.enabled,
            () =>
              html`<button @click=${this.toggle}>
                <slot name="label"></slot>
              </button>`,
            () => html`<slot name="label"></slot>`
          )}
        </h3>`;

    const content = html`<div
      id=${ifNeeded(this.enabled, this.#contentId)}
      role="region"
      aria-labelledby=${ifNeeded(this.enabled, this.#invokerId)}
      ?hidden=${ifNeeded(this.enabled, !this.expanded)}
    >
      <slot name="content"></slot>
    </div>`;

    return html`<section>${header}${content}</section> `;
  }

  toggle() {
    if (this.enabled) {
      this.expanded = !this.expanded;
    }
  }
}
