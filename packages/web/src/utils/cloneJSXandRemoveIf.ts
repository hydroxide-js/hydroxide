export function cloneJSXandRemoveIf(jsxElement: JSX.HtmlElement) {
  const modifiedJSXElement = {} as JSX.HtmlElement

  for (const key in jsxElement) {
    if (key !== '$if') {
      // @ts-expect-error
      modifiedJSXElement[key] = jsxElement[key]
    }
  }

  return modifiedJSXElement
}
