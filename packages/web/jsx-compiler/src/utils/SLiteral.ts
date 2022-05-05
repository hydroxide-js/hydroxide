import { types as t } from '@babel/core'

export type SLiteral = Exclude<t.Literal, t.RegExpLiteral | t.NullLiteral>

export function isSLiteral(expr: any): expr is SLiteral {
  if (t.isLiteral(expr)) {
    if (t.isRegExpLiteral(expr) || t.isNullLiteral(expr)) return false
    if (t.isTemplateLiteral(expr)) {
      return expr.expressions.length === 0
    }
    return true
  }
  return false
}

export function valueOfSLiteral(expr: SLiteral) {
  if (t.isTemplateLiteral(expr)) {
    return expr.quasis[0].value.raw
  }

  return expr.value
}
