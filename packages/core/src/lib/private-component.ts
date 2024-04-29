import { customElement } from "lit/decorators.js";

const PREFIX = "esb-"; // "E"moji "S"tock"B"ook

export const privateCustomElement = (tagName: string) =>
  customElement(`${PREFIX}${tagName}`);
