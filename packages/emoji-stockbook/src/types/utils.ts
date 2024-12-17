export type MaybePromise<T> = T | Promise<T>;
export type ValueOrGetter<T> = T | (() => T);
