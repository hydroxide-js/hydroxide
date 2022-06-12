import { types as t } from '@babel/core'

export function removeAttribute(
  attributes: (t.JSXAttribute | t.JSXSpreadAttribute)[],
  attr: t.JSXAttribute
) {
  const index = attributes.findIndex((at) => at === attr)
  attributes.splice(index, 1)
}

// mark the given callExpr as pure by appending the pure comment
export function markAsPure(callExpr: t.CallExpression) {
  return t.addComment(callExpr, 'leading', '#__PURE__')
}
