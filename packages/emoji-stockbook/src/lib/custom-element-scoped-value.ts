import { getContext, onDestroy, setContext } from "svelte";

export interface CustomElementScopedValue<T, P = void> {
  (): T;
  setup: (param: P) => void;
}

export const customElementScopedValue = <T, P = void>(
  factory: (param: P) => T,
  cleanup?: (value: T) => void
): CustomElementScopedValue<T, P> => {
  const key = Symbol();

  const setup = (param: P) => {
    const value = factory(param);
    setContext(key, value);

    if (cleanup) {
      onDestroy(() => {
        cleanup(value);
      });
    }
  };
  const use = (): T => getContext(key);

  return Object.assign(use, { setup });
};
