import { getContext, setContext } from "svelte";

export type CustomElementScopedValue<T, P = void> = [
  setup: (param: P) => void,
  use: () => T,
];

export const customElementScopedValue = <T, P = void>(
  factory: (param: P) => T,
): CustomElementScopedValue<T, P> => {
  const key = Symbol();

  const setup = (param: P) => {
    setContext(key, factory(param));
  };
  const use = (): T => getContext(key);

  return [setup, use];
};
