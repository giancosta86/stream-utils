export namespace Iterable {
  export function empty<T>(iterable: Iterable<T>): boolean {
    return !!iterable[Symbol.iterator]().next().done;
  }
}
