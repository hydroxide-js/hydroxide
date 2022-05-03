import { types as t } from '@babel/core'

export function createElementCallExpr(
  templateId: t.Identifier,
  exprs: t.Expression[]
) {
  return t.callExpression(templateId, exprs)
}
