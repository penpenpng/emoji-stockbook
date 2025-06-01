import { getContext, onDestroy, setContext } from "svelte";
import { URecord } from "./utils/index.js";

export class ScopedValue {
  constructor() {}
  [Symbol.dispose]() {}
}

type ScopedValueConstructor<T extends ScopedValue> = new () => T;

const rootKey = Symbol();

export const createCustomElementScope = () => {
  const dict: Record<symbol, ScopedValue> = {};

  setContext(rootKey, dict);

  onDestroy(() => {
    for (const v of URecord.values(dict)) {
      v[Symbol.dispose]?.();
    }
  });
};

export const scoped = <T extends ScopedValue>(
  cls: ScopedValueConstructor<T>
) => {
  const key = Symbol();

  const use = (): T => {
    const context = getContext<any>(rootKey);

    return (context[key] ??= new cls());
  };

  return use;
};
