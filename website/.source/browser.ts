// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"components.mdx": () => import("../content/docs/components.mdx?collection=docs"), "index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "jsx.mdx": () => import("../content/docs/jsx.mdx?collection=docs"), "list-rendering.mdx": () => import("../content/docs/list-rendering.mdx?collection=docs"), "quick-start.mdx": () => import("../content/docs/quick-start.mdx?collection=docs"), "reactivity.mdx": () => import("../content/docs/reactivity.mdx?collection=docs"), "state-utilities.mdx": () => import("../content/docs/state-utilities.mdx?collection=docs"), }),
};
export default browserCollections;