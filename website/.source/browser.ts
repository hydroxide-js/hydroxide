// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "installation.mdx": () => import("../content/docs/installation.mdx?collection=docs"), "list-rendering.mdx": () => import("../content/docs/list-rendering.mdx?collection=docs"), "reactive-state.mdx": () => import("../content/docs/reactive-state.mdx?collection=docs"), "state-utilities.mdx": () => import("../content/docs/state-utilities.mdx?collection=docs"), }),
};
export default browserCollections;