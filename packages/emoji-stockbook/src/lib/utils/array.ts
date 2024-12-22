export const chunk = <T>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, (i + 1) * size),
  );
};

export const remove = <T>(array: T[], value: T): void => {
  for (let idx = 0; idx < array.length; idx++) {
    if (array[idx] === value) {
      array.splice(idx, 1);
      idx--;
    }
  }
};

export const put = <T>(
  array: T[],
  selector: number | ((e: T) => boolean),
  value: T,
): void => {
  if (typeof selector === "number") {
    array[selector] = value;
    return;
  }

  for (const idx in array) {
    if (selector(array[idx])) {
      array[idx] = value;
    }
  }
};

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
