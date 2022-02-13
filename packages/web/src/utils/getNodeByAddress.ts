export type NodeAddress = number[]

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

export function getNodeByAddress(rootNode: Node, address: NodeAddress): Node {
  const start = rootNode
  return address.reduce(nthChild, start)
}

export function getDataFromJSX(
  nueElement: JSX.NueElement,
  address: NodeAddress
): any {
  return address.reduce((acc: JSX.NueElement, key) => {
    return (acc.props.children as JSX.NueElement[])[key]
  }, nueElement)
}

export function createTemplate(html: string) {
  const template = document.createElement('template')
  template.innerHTML = html
  return template
}
