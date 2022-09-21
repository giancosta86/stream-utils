export async function* asyncMerge<T>(
  ...items: (T | AsyncIterable<T> | Iterable<T>)[]
): AsyncIterable<T> {
  for (const item of items) {
    if (typeof item === "object" && item) {
      if (Symbol.asyncIterator in item) {
        yield* item as AsyncIterable<T>;
      } else if (Symbol.iterator in item) {
        yield* item as Iterable<T>;
      } else {
        yield item as T;
      }
    } else {
      yield item as T;
    }
  }
}
