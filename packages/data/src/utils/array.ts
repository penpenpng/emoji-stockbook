const skip: unique symbol = Symbol();
type SkipSymbol = typeof skip;

export const mapfilter = <T, U>(
  array: T[],
  map: (item: T, skip: SkipSymbol) => U | SkipSymbol,
): U[] => {
  const output: U[] = [];

  for (const item of array) {
    const mapped = map(item, skip);
    if (mapped === skip) {
      continue;
    }

    output.push(mapped);
  }

  return output;
};
