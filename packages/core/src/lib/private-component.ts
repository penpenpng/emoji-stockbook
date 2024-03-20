import type { LitElement } from "lit";

import { toKebab } from "./casing.js";

const PREFIX = "esb-"; // "E"moji "S"tock"B"ook

export const definePrivateComponent = <
  E extends LitElement & Props,
  Props extends object,
>(
  Element: new () => E
) => {
  const tagName = `${PREFIX}${toKebab(Element.name)}`;
  if (!customElements.get(tagName)) {
    customElements.define(tagName, Element);
  }

  return (props: Props): E => {
    const el = new Element();
    for (const [propName, value] of Object.entries(props)) {
      // justified by `E extends Props`
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (el as any)[propName] = value;
    }
    return el;
  };
};
