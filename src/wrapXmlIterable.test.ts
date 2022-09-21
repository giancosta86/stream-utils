import { Readable } from "node:stream";
import all from "it-all";
import { wrapXmlIterable } from "./wrapXmlIterable";

describe("Wrapping an async iterable into an XML root", () => {
  it("should support an empty iterable", async () => {
    const source = Readable.from([]);

    const wrapped = await all(wrapXmlIterable(source));

    expect(wrapped).toEqual(["<XmlRootNode>", "</XmlRootNode>"]);
  });

  it("should actually wrap the items between XML tags", async () => {
    const items = ["<alpha />", "<beta />", "<gamma />"];

    const source = Readable.from(items);

    const wrapped = await all(wrapXmlIterable(source));

    expect(wrapped).toEqual(["<XmlRootNode>", ...items, "</XmlRootNode>"]);
  });
});
