import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { NullWritable } from "null-writable";
import { addBatchListener } from "./batchListener";

describe("Registering a batch listener", () => {
  it("should actually call the listener after each batch of events", async () => {
    const source = Readable.from([3, 7, 90, 92, 95, 98, 100]);

    let processedItems = 0;
    let processedBatches = 0;

    const extendedSource = addBatchListener({
      source,
      event: "data",
      eventBatchSize: 2,
      batchListener: totalEventCount => {
        processedItems = totalEventCount;
        processedBatches++;
      }
    });

    await pipeline([extendedSource, new NullWritable({ objectMode: true })]);

    expect(extendedSource).toBe(source);
    expect(processedBatches).toBe(3);
    expect(processedItems).toBe(6);
  });
});
