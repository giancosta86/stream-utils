import { Readable } from "node:stream";
import { setTimeout as delay } from "node:timers/promises";
import all from "it-all";
import { asyncMerge } from "./asyncMerge";

type TestPrimitive = number | boolean | string;

type Bear = { name: string; age: number };

const yogi: Bear = { name: "Yogi", age: 36 };
const bubu: Bear = { name: "Bubu", age: 32 };

async function* testGenerator(base: number): AsyncIterable<number> {
  yield base;
  await delay(10);
  yield base + 2;
}

describe("Merging into an async iterable", () => {
  describe("when passing non-iterable values", () => {
    it("should work with primitives", async () => {
      const asyncIterable = asyncMerge<TestPrimitive>(90, true, "Dodo");

      const actualItems = await all(asyncIterable);

      expect(actualItems).toEqual([90, true, "Dodo"]);
    });

    it("should work with objects", async () => {
      const asyncIterable = asyncMerge<object>(yogi, bubu);

      const actualItems = await all(asyncIterable);

      expect(actualItems).toEqual([yogi, bubu]);
    });
  });

  it("should work with sync iterables", async () => {
    const asyncIterable = asyncMerge<TestPrimitive | Bear>(
      [90, "Dodo"],
      new Set([yogi]),
      new Set([bubu])
    );

    const actualItems = await all(asyncIterable);

    expect(actualItems).toEqual([90, "Dodo", yogi, bubu]);
  });

  it("should work with async iterables", async () => {
    const asyncIterable = asyncMerge(
      testGenerator(90),
      Readable.from(["Dodo", yogi, bubu])
    );

    const actualItems = await all(asyncIterable);

    expect(actualItems).toEqual([90, 92, "Dodo", yogi, bubu]);
  });

  it("should work with a mix of primitives and iterators", async () => {
    const asyncIterable = asyncMerge<TestPrimitive | Bear>(
      7,
      ["Dodo", yogi],
      testGenerator(90),
      Readable.from(["Ciop", bubu])
    );

    const actualItems = await all(asyncIterable);

    expect(actualItems).toEqual([7, "Dodo", yogi, 90, 92, "Ciop", bubu]);
  });
});
