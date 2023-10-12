import { Iterable } from ".";

describe("Iterable.isSupported()", () => {
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
