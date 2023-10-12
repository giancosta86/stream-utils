export function getFirst<T>(iterable: Iterable<T>): T {
  const firstEntry = iterable[Symbol.iterator]().next();

  if (firstEntry.done) {
    throw new Error(`Empty iterable`);
  }

  return firstEntry.value;
}
