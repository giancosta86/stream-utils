export namespace Iterable {
  export function isEmpty(iterable: Iterable<unknown>): boolean {
    return !!iterable[Symbol.iterator]().next().done;
  }

  export function isSupported(
    potential: unknown
  ): potential is Iterable<unknown> {
    return (potential as any)[Symbol.iterator] !== undefined;
  }

  export function getFirst<T>(iterable: Iterable<T>): T {
    const firstEntry = iterable[Symbol.iterator]().next();

    if (firstEntry.done) {
      throw new Error(`Empty iterable`);
    }

    return firstEntry.value;
  }
}
