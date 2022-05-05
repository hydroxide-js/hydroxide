import { types as t } from '@babel/core'
import { isUndef } from './isUndef'
import { isSLiteral, SLiteral } from './SLiteral'

type ExpressionHandlers = {
  Empty: () => any
  SLiteral: (value: SLiteral) => any
  null: (expr: t.NullLiteral) => any
  undefined: (expr: t.Identifier) => any
  Expr: (expr: t.Expression) => any
}

/**
 * helper function to handle various types of values in expression container
 */
export function handleExpressionContainer(
  node: t.JSXExpressionContainer,
  handlers: ExpressionHandlers
) {
  const expr = node.expression

  // empty jsx container {}
  if (t.isJSXEmptyExpression(expr)) {
    return handlers.Empty()
  }

  // number, boolean, string
  else if (isSLiteral(expr)) {
    return handlers.SLiteral(expr)
  }

  // null
  else if (t.isNullLiteral(expr)) {
    return handlers.null(expr)
  }

  // undefined
  else if (isUndef(expr)) {
    return handlers.undefined(expr)
  }

  // other expression
  else {
    return handlers.Expr(expr)
  }
}
