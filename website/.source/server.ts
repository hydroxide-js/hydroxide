// @ts-nocheck
import * as __fd_glob_8 from "../content/docs/state-utilities.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/reactivity.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/quick-start.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/list-rendering.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/jsx.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/index.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/conditional-rendering.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/components.mdx?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {"meta.json": __fd_glob_0, }, {"components.mdx": __fd_glob_1, "conditional-rendering.mdx": __fd_glob_2, "index.mdx": __fd_glob_3, "jsx.mdx": __fd_glob_4, "list-rendering.mdx": __fd_glob_5, "quick-start.mdx": __fd_glob_6, "reactivity.mdx": __fd_glob_7, "state-utilities.mdx": __fd_glob_8, });