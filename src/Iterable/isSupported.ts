export function isSupported(
  potential: unknown
): potential is Iterable<unknown> {
  return (potential as any)[Symbol.iterator] !== undefined;
}
