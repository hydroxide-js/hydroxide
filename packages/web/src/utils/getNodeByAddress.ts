import { NodeAddress } from '../types'

/**
 * this is actually faster than doing `node.childNodes[n]`
 * because accessing childNodes causes reflow, which is no good.
 */
export function nthChild(node: Node, n: number) {
  let target = node.firstChild!
  for (let i = 0; i < n; i++) {
    target = target.nextSibling!
  }
  return target
}

export function getNodeByAddress(
  rootNode: Node,
  address: NodeAddress,
  isFragment = false
): Node {
  const start = isFragment ? rootNode : rootNode.firstChild
  // @ts-ignore
  return address.reduce(nthChild, start)
}

export function getDataFromJSX(jsxRoot: JSX.Element, address: NodeAddress): any {
  // @ts-ignore
  return address.reduce((acc, key) => acc[2][key], jsxRoot)
}

export function createTemplate(html: string) {
  const template = document.createElement('template')
  template.innerHTML = html
  return template
}
