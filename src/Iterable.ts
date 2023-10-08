export namespace Iterable {
  export function isEmpty(iterable: Iterable<unknown>): boolean {
    return !!iterable[Symbol.iterator]().next().done;
  }

  export function isSupported(
    potential: unknown
  ): potential is Iterable<unknown> {
    return (potential as any)[Symbol.iterator] !== undefined;
  }
}
