import { NodePath, types as t } from '@babel/core'
import { isUndef } from './isUndef'
import { isSLiteral, valueOfSLiteral } from './SLiteral'

type ExpressionHandlers = {
  Empty: () => any
  SLiteral: (value: string | number | boolean) => any
  null: () => any
  undefined: () => any
  Expr: (expr: t.Expression) => any
}

/**
 * helper function to handle various types of values in expression container
 */
export function handleExpressionContainer(
  path: NodePath<t.JSXExpressionContainer>,
  handlers: ExpressionHandlers
) {
  const expr = path.node.expression

  // empty jsx container {}
  if (t.isJSXEmptyExpression(expr)) {
    return handlers.Empty()
  }

  // number, boolean, string
  else if (isSLiteral(expr)) {
    return handlers.SLiteral(valueOfSLiteral(expr))
  }

  // null
  else if (t.isNullLiteral(expr)) {
    return handlers.null()
  }

  // undefined
  else if (isUndef(expr)) {
    return handlers.undefined()
  }

  // other expression
  else {
    return handlers.Expr(expr)
  }
}
