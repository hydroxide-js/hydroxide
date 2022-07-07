import * as t from '@babel/types'
import { SLiteral } from '../types'
import { isSLiteral, isUndef } from '../utils/check'

export function valueOfSLiteral(expr: SLiteral) {
  if (t.isTemplateLiteral(expr)) {
    return escape(expr.quasis[0].value.raw)
  }

  return escape(expr.value + '')
}

export function getAttrName(name: t.JSXNamespacedName | t.JSXIdentifier) {
  if (t.isJSXNamespacedName(name)) {
    return name.namespace.name + ':' + name.name.name
  } else {
    return name.name
  }
}

export function escape(str: string) {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll("'", '&apos;')
    .replaceAll('"', '&quot;')
}

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
