import { Iterable } from ".";

describe("Iterable.rangeIncluding()", () => {
  describe("when the lower bound is smaller than the upper bound", () => {
    it("should return the expected range", () => {
      const iterable = Iterable.rangeIncluding(4, 9);

      expect(Iterable.equals(iterable, [4, 5, 6, 7, 8, 9])).toBeTrue();
    });
  });

  describe("when the bounds overlap at a value", () => {
    it("should return an iterator containing such value", () => {
      const iterable = Iterable.rangeIncluding(90, 90);

      expect(Iterable.equals(iterable, [90])).toBeTrue();
    });
  });

  describe("when the lower bound is greater than the upper bound", () => {
    it("should return an empty iterator", () => {
      const iterable = Iterable.rangeIncluding(90, 4);

      expect(Iterable.isEmpty(iterable)).toBeTrue();
    });
  });
});
