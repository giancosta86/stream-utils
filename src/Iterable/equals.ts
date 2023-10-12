const defaultItemEquality = <T>(a: T, b: T) => a === b;

export function equals<T>(
  leftItems: Iterable<T>,
  rightItems: Iterable<T>,
  itemEquality: (left: T, right: T) => boolean = defaultItemEquality
) {
  const expectedIterator = rightItems[Symbol.iterator]();

  for (const leftItem of leftItems) {
    const rightStep = expectedIterator.next();

    if (rightStep.done) {
      return false;
    }

    const rightItem = rightStep.value;

    if (!itemEquality(leftItem, rightItem)) {
      return false;
    }
  }

  return !!expectedIterator.next().done;
}
