import { equals } from "./equals";
import { getFirst } from "./getFirst";
import { isEmpty } from "./isEmpty";
import { isSupported } from "./isSupported";
import { rangeIncluding } from "./rangeIncluding";

export const Iterable = {
  equals,
  getFirst,
  isEmpty,
  isSupported,
  rangeIncluding
} as const;
