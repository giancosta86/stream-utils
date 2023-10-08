import { Iterable } from "./Iterable";

describe("Iterable", () => {
  describe("empty()", () => {
    describe("when evaluating an empty array", () => {
      it("should return true", () => {
        expect(Iterable.empty([])).toBeTrue();
      });
    });

    describe("when evaluating a non-empty array", () => {
      it("should return false", () => {
        expect(Iterable.empty([1])).toBeFalse();
      });
    });
  });
});
