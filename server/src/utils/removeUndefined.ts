export const removeUndefined = <T extends object>(obj: T) =>
  Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== undefined),
  ) as Partial<T>;
