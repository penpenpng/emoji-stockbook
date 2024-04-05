import type { LitElement } from "lit";
import { customElement } from "lit/decorators.js";

const PREFIX = "esb-"; // "E"moji "S"tock"B"ook

export const privateCustomElement = (tagName: string) =>
  customElement(`${PREFIX}${tagName}`);

// TODO:
// 原則この手のは context で渡すことにすれば、これが必要になるのは emoji-button くらいになるはず
// render に直接作った DOM を入れるのはパフォーマンス上の問題がありそうなので避けたい

/** Create a short-hand function to render an element using complex property. */
export const createFactory =
  <E extends LitElement & Props, Props extends object>(Element: new () => E) =>
  (props: Props): E => {
    const el = new Element();
    for (const [propName, value] of Object.entries(props)) {
      // justified by `E extends Props`
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (el as any)[propName] = value;
    }
    return el;
  };
