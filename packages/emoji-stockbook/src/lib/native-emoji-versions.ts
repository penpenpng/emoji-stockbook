const nativeEmojiVersions = [
  0.6, 0.7, 1, 2, 3, 4, 5, 11, 12, 12.1, 13, 13.1, 14, 15.1, 16,
];

export const includeVersions = (version: number): number[] =>
  nativeEmojiVersions.filter((v) => v >= version);
