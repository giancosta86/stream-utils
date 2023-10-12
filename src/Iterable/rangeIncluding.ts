export function* rangeIncluding(
  fromIncluding: number,
  upToIncluding: number
): Iterable<number> {
  for (let i = fromIncluding; i <= upToIncluding; i++) {
    yield i;
  }
}
