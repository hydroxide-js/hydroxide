import { NodeAddress } from './queryDOM'

export function queryJSX(
  jsxHtmlElement: JSX.HtmlElement,
  address: NodeAddress
): JSX.Element {
  return address.reduce(
    (acc, key) => (acc.children as JSX.HtmlElement[])[key],
    jsxHtmlElement
  )
}
