export const chunk = <T>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, (i + 1) * size),
  );
};

export const remove = <T>(array: T[], value: T): T[] => {
  return array.filter((e) => e !== value);
};
