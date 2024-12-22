export const ifexist = <T, U>(
  receiver: T | null | undefined,
  f: (arg: T) => U,
): U | undefined => {
  if (receiver === null || receiver === undefined) {
    return undefined;
  }

  return f(receiver);
};
