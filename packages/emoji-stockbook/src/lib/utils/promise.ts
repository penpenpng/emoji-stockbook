export const never = <T>(): Promise<T> => new Promise<T>(() => {});

/**
 * Create a promise that is resolved with the first resolved value,
 * or is rejected with all rejected reasons.
 */
export const first = <T>(promises: Promise<T>[]): Promise<T> =>
  new Promise(async (resolve, reject) => {
    const errors = await Promise.all(
      promises.map((p) => p.then(resolve).catch((err) => err)),
    );

    if (errors.some((err) => !!err)) {
      reject(errors);
    }
  });
