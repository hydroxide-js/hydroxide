import { types as t } from '@babel/core'

export function isUndef(expression: any): expression is t.Identifier {
  return t.isIdentifier(expression, { name: 'undefined' })
}
