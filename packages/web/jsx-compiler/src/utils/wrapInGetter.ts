import { types as t } from '@babel/core'

export function createGetterMethod(propName: string, expr: t.Expression) {
  return t.objectMethod(
    'get',
    t.identifier(propName),
    [],
    t.blockStatement([t.returnStatement(expr)])
  )
}
