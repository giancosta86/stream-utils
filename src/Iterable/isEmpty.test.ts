import { Iterable } from ".";

describe("Iterable.isEmpty()", () => {
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
