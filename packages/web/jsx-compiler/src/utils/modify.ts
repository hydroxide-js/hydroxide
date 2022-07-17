import * as t from '@babel/types'

export function removeAttribute(jsxElement: t.JSXElement, attr: t.JSXAttribute) {
  const attributes = jsxElement.openingElement.attributes
  const index = attributes.findIndex(at => at === attr)
  attributes.splice(index, 1)
}

// mark the given callExpr as pure by appending the pure comment
export function markAsPure(callExpr: t.CallExpression) {
  return t.addComment(callExpr, 'leading', '#__PURE__')
}
