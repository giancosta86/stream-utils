export function isEmpty(iterable: Iterable<unknown>): boolean {
  return !!iterable[Symbol.iterator]().next().done;
}
