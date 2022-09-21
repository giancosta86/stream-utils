import { Stream } from "node:stream";

export type AddBatchListenerParams<T extends Stream> = {
  source: T;
  event: string;
  eventBatchSize: number;
  batchListener: (totalEventCount: number) => void;
};

export function addBatchListener<T extends Stream>({
  source,
  event,
  eventBatchSize,
  batchListener
}: AddBatchListenerParams<T>): T {
  let totalEventCount = 0;

  source.on(event, () => {
    totalEventCount++;

    if (totalEventCount % eventBatchSize == 0) {
      batchListener(totalEventCount);
    }
  });

  return source;
}
