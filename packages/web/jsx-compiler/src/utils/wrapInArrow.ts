import { types as t } from '@babel/core'

export function wrapInArrow(expr: t.Expression) {
  // convert x() to x, because () => x() === x
  if (
    t.isCallExpression(expr) &&
    t.isIdentifier(expr.callee) &&
    expr.arguments.length === 0
  ) {
    return expr.callee
  }

  return t.arrowFunctionExpression([], expr)
}
