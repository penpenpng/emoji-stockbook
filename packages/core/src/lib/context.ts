import { ContextConsumer, createContext } from "@lit/context";
import type { ReactiveController, ReactiveControllerHost } from "lit";

import { PaletteModel, Stockbook, Unsubscribe } from "./stockbook.js";

export const stockbookContext = createContext<Stockbook>("emoji-stockbook");

export type HostElement = ReactiveControllerHost & HTMLElement;

export class PaletteConsumerController implements ReactiveController {
  #stockbook?: Stockbook;
  #unsubscribe?: Unsubscribe;
  #dispose?: Unsubscribe;
  #value?: PaletteModel;

  constructor(private host: HostElement) {
    host.addController(this);
  }

  hostConnected(): void {
    new ContextConsumer(this.host, {
      context: stockbookContext,
      subscribe: true,
      callback: (stockbook, dispose) => {
        if (this.#stockbook !== stockbook) {
          this.#unsubscribe?.();
        }

        this.#stockbook = stockbook;
        this.#unsubscribe = stockbook.subscribePalette((v) => {
          this.#value = v;
          this.host.requestUpdate();
        });
        this.#dispose = dispose;
      },
    });
  }

  hostDisconnected(): void {
    this.#unsubscribe?.();
    this.#dispose?.();

    this.#stockbook = undefined;
    this.#unsubscribe = undefined;
  }

  get value() {
    return this.#value;
  }
}

export class SearchController implements ReactiveController {
  #stockbook?: Stockbook;
  #dispose?: Unsubscribe;

  #query = "";

  constructor(private host: HostElement) {
    host.addController(this);
  }

  hostConnected(): void {
    new ContextConsumer(this.host, {
      context: stockbookContext,
      subscribe: true,
      callback: (stockbook, dispose) => {
        this.#stockbook = stockbook;
        this.#dispose = dispose;

        this.search(this.#query);
      },
    });
  }

  hostDisconnected(): void {
    this.#dispose?.();

    this.#stockbook = undefined;
  }

  search(query: string) {
    this.#query = query;
    this.#stockbook?.search(query);
  }

  get query() {
    return this.#query;
  }
}
