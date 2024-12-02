import { getContext, setContext } from "svelte";

export type CustomElementScopedValue<T> = [setup: () => void, use: () => T];

export const customElementScopedValue = <T>(
  factory: () => T,
): CustomElementScopedValue<T> => {
  const key = Symbol();

  const setup = () => setContext(key, factory());
  const use = (): T => getContext(key);

  return [setup, use];
};
