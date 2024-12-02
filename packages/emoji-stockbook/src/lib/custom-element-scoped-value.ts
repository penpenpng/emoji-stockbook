import { getContext, setContext } from "svelte";

export interface CustomElementScopedValue<T, P = void> {
  (): T;
  setup: (param: P) => void;
}

export const customElementScopedValue = <T, P = void>(
  factory: (param: P) => T,
): CustomElementScopedValue<T, P> => {
  const key = Symbol();

  const setup = (param: P) => {
    setContext(key, factory(param));
  };
  const use = (): T => getContext(key);

  return Object.assign(use, { setup });
};
