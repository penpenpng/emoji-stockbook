import { ContextConsumer, createContext } from "@lit/context";
import type { ReactiveController, ReactiveControllerHost } from "lit";

import { PaletteModel, Stockbook, Unsubscribe } from "./stockbook.js";

export const stockbookContext = createContext<Stockbook>("emoji-stockbook");

export class PaletteConsumerController implements ReactiveController {
  #stockbook?: Stockbook;
  #unsubscribe?: Unsubscribe;
  #dispose?: Unsubscribe;
  #value?: PaletteModel;

  constructor(private host: ReactiveControllerHost & HTMLElement) {
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
