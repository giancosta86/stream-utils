import { Iterable } from "./Iterable";

describe("Iterable", () => {
  describe("isEmpty()", () => {
    describe.each([
      {
        category: "arrays",
        empty: [],
        nonEmpty: [1]
      },
      {
        category: "strings",
        empty: "",
        nonEmpty: "X"
      }
    ])("when evaluating $category", ({ empty, nonEmpty }) => {
      describe("for empty instance", () => {
        it("should return true", () => {
          expect(Iterable.isEmpty(empty)).toBeTrue();
        });
      });

      describe("for non-empty instance", () => {
        it("should return false", () => {
          expect(Iterable.isEmpty(nonEmpty)).toBeFalse();
        });
      });
    });
  });

  describe("isSupported()", () => {
    describe.each([
      {
        category: "non-empty arrays",
        value: [90, 92, 98],
        expected: true
      },

      {
        category: "empty arrays",
        value: [],
        expected: true
      },

      {
        category: "numbers",
        value: 90,
        expected: false
      },

      {
        category: "non-empty strings",
        value: "Dodo",
        expected: true
      },

      {
        category: "empty strings",
        value: "",
        expected: true
      }
    ])("when applied to $category", ({ value, expected }) => {
      it(`should return ${expected}`, () => {
        expect(Iterable.isSupported(value)).toBe(expected);
      });
    });
  });

  describe("getFirst()", () => {
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
      ({
        items,
        expected
      }: {
        items: Iterable<unknown>;
        expected: unknown;
      }) => {
        it(
          expected !== Error
            ? "should retrieve the first item"
            : "should throw",
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
});
