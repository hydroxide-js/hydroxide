import { NodePath, types as t } from '@babel/core'
import { isUndef } from './isUndef'
import { isSLiteral, valueOfSLiteral } from './stringifyLiteral'

type ExpressionHandlers = {
  Empty: () => any
  SLiteral: (value: string | number | boolean) => any
  null: () => any
  undefined: () => any
  Expr: (expr: t.Expression) => any
}

export function handleExpressionContainer(
  path: NodePath<t.JSXExpressionContainer>,
  handlers: ExpressionHandlers
) {
  const expr = path.node.expression

  if (t.isJSXEmptyExpression(expr)) {
    return handlers.Empty()
  } else if (isSLiteral(expr)) {
    return handlers.SLiteral(valueOfSLiteral(expr))
  } else if (t.isNullLiteral(expr)) {
    return handlers.null()
  } else if (isUndef(expr)) {
    return handlers.undefined()
  } else {
    return handlers.Expr(expr)
  }
}
