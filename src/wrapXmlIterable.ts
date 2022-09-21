import { asyncMerge } from "./asyncMerge";

const DEFAULT_ROOT_TAG = "XmlRootNode";

export function wrapXmlIterable(
  source: AsyncIterable<string>,
  rootTag = DEFAULT_ROOT_TAG
): AsyncIterable<string> {
  return asyncMerge(`<${rootTag}>`, source, `</${rootTag}>`);
}
