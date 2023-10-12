import { Iterable } from ".";

describe("Iterable.getFirst()", () => {
  describe.each([
    {
      category: "non-empty arrays",
      items: [90, 92, 98],
      expected: 90
    },

    {
      category: "empty arrays",
      items: [],
      expected: Error
    },

    {
      category: "non-empty strings",
      items: "Yogi",
      expected: "Y"
    },

    {
      category: "empty strings",
      items: "",
      expected: Error
    }
  ])(
    "when applied to $category",
    ({ items, expected }: { items: Iterable<unknown>; expected: unknown }) => {
      it(
        expected !== Error ? "should retrieve the first item" : "should throw",
        () => {
          if (expected !== Error) {
            expect(Iterable.getFirst(items)).toBe(expected);
          } else {
            expect(() => Iterable.getFirst(items)).toThrow("Empty iterable");
          }
        }
      );
    }
  );
});
