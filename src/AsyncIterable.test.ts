import { Readable } from "node:stream";
import { setTimeout as delay } from "node:timers/promises";
import all from "it-all";
import { AsyncIterable } from "./AsyncIterable";

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
      const asyncIterable = AsyncIterable.from<TestPrimitive>(90, true, "Dodo");

      const actualItems = await all(asyncIterable);

      expect(actualItems).toEqual([90, true, "Dodo"]);
    });

    it("should work with objects", async () => {
      const asyncIterable = AsyncIterable.from<object>(yogi, bubu);

      const actualItems = await all(asyncIterable);

      expect(actualItems).toEqual([yogi, bubu]);
    });
  });

  it("should work with sync iterables", async () => {
    const asyncIterable = AsyncIterable.from<TestPrimitive | Bear>(
      [90, "Dodo"],
      new Set([yogi]),
      new Set([bubu])
    );

    const actualItems = await all(asyncIterable);

    expect(actualItems).toEqual([90, "Dodo", yogi, bubu]);
  });

  it("should work with async iterables", async () => {
    const asyncIterable = AsyncIterable.from(
      testGenerator(90),
      Readable.from(["Dodo", yogi, bubu])
    );

    const actualItems = await all(asyncIterable);

    expect(actualItems).toEqual([90, 92, "Dodo", yogi, bubu]);
  });

  it("should work with a mix of primitives and iterators", async () => {
    const asyncIterable = AsyncIterable.from<TestPrimitive | Bear>(
      7,
      ["Dodo", yogi],
      testGenerator(90),
      Readable.from(["Ciop", bubu])
    );

    const actualItems = await all(asyncIterable);

    expect(actualItems).toEqual([7, "Dodo", yogi, 90, 92, "Ciop", bubu]);
  });
});

describe("Wrapping an async iterable into an XML root", () => {
  it("should support an empty iterable", async () => {
    const source = Readable.from([]);

    const wrapped = await all(AsyncIterable.wrapXml(source));

    expect(wrapped).toEqual(["<XmlRootNode>", "</XmlRootNode>"]);
  });

  it("should actually wrap the items between XML tags", async () => {
    const items = ["<alpha />", "<beta />", "<gamma />"];

    const source = Readable.from(items);

    const wrapped = await all(AsyncIterable.wrapXml(source));

    expect(wrapped).toEqual(["<XmlRootNode>", ...items, "</XmlRootNode>"]);
  });
});
