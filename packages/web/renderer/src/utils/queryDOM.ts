export type NodeAddress = number[]

/**
 * This is actually faster than doing `node.childNodes[n]`
 * because accessing childNodes causes reflow
 * using firstChild and nextSibling does not cause reflow
 */
export function nthChild(node: Node, n: number) {
  let target = node.firstChild!
  for (let i = 0; i < n; i++) {
    target = target.nextSibling!
  }
  return target
}

export function queryDOM(rootNode: Node, address: NodeAddress): Node {
  return address.reduce(nthChild, rootNode)
}
