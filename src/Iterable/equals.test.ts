import { Iterable } from ".";

class Bear {
  constructor(readonly name: string) {}

  equals(other: Bear): boolean {
    return this.name == other.name;
  }
}

const arrayEqualityScenarios = [
  {
    description: "empty arrays",
    valueFactory: () => []
  },

  {
    description: "arrays having the same one item",
    valueFactory: () => [1]
  },

  {
    description: "arrays having equal items",
    valueFactory: () => [7, 90, 92]
  },

  {
    description: "string arrays having equal items",
    valueFactory: () => ["alpha", "beta", "gamma"]
  },

  {
    description: "object with custom equality function",
    valueFactory: () => [new Bear("Yogi"), new Bear("Bubu")],
    itemEquality: (left: Bear, right: Bear) => left.equals(right)
  }
];

const arrayInequalityScenarios = [
  {
    description: "empty left array and non-empty right array",
    leftFactory: () => [],
    rightFactory: () => [2]
  },

  {
    description: "non-empty left array and empty right array",
    leftFactory: () => [3],
    rightFactory: () => []
  },

  {
    description: "left array having more items",
    leftFactory: () => [3, 4],
    rightFactory: () => [3]
  },

  {
    description: "left array having less items",
    leftFactory: () => [3],
    rightFactory: () => [3, 4]
  },

  {
    description: "arrays having equal items in different order",
    leftFactory: () => [3, 4, 5],
    rightFactory: () => [4, 3, 5]
  },

  {
    description: "arrays having the same length but different items",
    leftFactory: () => [3, 4, 5],
    rightFactory: () => [90, 92, 98]
  }
];

const generatorEqualityScenarios = [
  {
    description: "empty generators",
    leftFactory: () => Iterable.rangeIncluding(1, 0),
    rightFactory: () => Iterable.rangeIncluding(1, 0)
  },

  {
    description: "generators having equal items",
    leftFactory: () => Iterable.rangeIncluding(1, 3),
    rightFactory: () => Iterable.rangeIncluding(1, 3)
  },

  {
    description: "empty left generator and empty right array",
    leftFactory: () => Iterable.rangeIncluding(1, 0),
    rightFactory: () => []
  },

  {
    description: "empty left array and empty right generator",
    leftFactory: () => [],
    rightFactory: () => Iterable.rangeIncluding(1, 0)
  },

  {
    description: "left generator and right array having equal items",
    leftFactory: () => Iterable.rangeIncluding(1, 4),
    rightFactory: () => [1, 2, 3, 4]
  },

  {
    description: "equal left array and right generator",
    leftFactory: () => [1, 2, 3, 4],
    rightFactory: () => Iterable.rangeIncluding(1, 4)
  }
];

const generatorInequalityScenarios = [
  {
    description: "empty left generator and non-empty right generator",
    leftFactory: () => Iterable.rangeIncluding(1, 0),
    rightFactory: () => Iterable.rangeIncluding(1, 3)
  },

  {
    description: "non-empty left generator and empty right generator",
    leftFactory: () => Iterable.rangeIncluding(1, 5),
    rightFactory: () => Iterable.rangeIncluding(1, 0)
  },

  {
    description: "left generator having less items than right generator",
    leftFactory: () => Iterable.rangeIncluding(1, 3),
    rightFactory: () => Iterable.rangeIncluding(1, 5)
  },

  {
    description: "left generator having more items than right generator",
    leftFactory: () => Iterable.rangeIncluding(1, 5),
    rightFactory: () => Iterable.rangeIncluding(1, 3)
  },

  {
    description: "generator and array having different items",
    leftFactory: () => Iterable.rangeIncluding(1, 3),
    rightFactory: () => [90, 92, 98]
  },

  {
    description: "generator and array having items in different order",
    leftFactory: () => Iterable.rangeIncluding(1, 3),
    rightFactory: () => [3, 1, 2]
  }
];

describe("Iterable.equals()", () => {
  describe.each(arrayEqualityScenarios)(
    "when given $description",
    ({ valueFactory, itemEquality }) => {
      it("should return true", () => {
        const left = valueFactory();
        const right = valueFactory();

        expect(Iterable.equals<any>(left, right, itemEquality)).toBeTrue();
      });
    }
  );

  describe.each(arrayInequalityScenarios)(
    "when given $description",
    ({ leftFactory, rightFactory }) => {
      it("should return false", () => {
        const left = leftFactory();
        const right = rightFactory();

        expect(Iterable.equals<unknown>(left, right)).toBeFalse();
      });
    }
  );

  describe.each(generatorEqualityScenarios)(
    "should return true when given $description",
    ({ leftFactory, rightFactory }) => {
      it("should return true", () => {
        const left = leftFactory();
        const right = rightFactory();

        expect(Iterable.equals<unknown>(left, right)).toBeTrue();
      });
    }
  );

  describe.each(generatorInequalityScenarios)(
    "when given $description",
    ({ leftFactory, rightFactory }) => {
      it("should be false", () => {
        const left = leftFactory();
        const right = rightFactory();

        expect(Iterable.equals<unknown>(left, right)).toBeFalse();
      });
    }
  );
});
