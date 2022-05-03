import { types as t } from '@babel/core'

// supports:
// string -> t.stringLiteral
// number -> t.numericLiteral
// array -> t.arrayExpression

type T = string | number | Array<string | number> | Array<T>

export function valueToAST(value: T): any {
  if (typeof value === 'string') {
    return t.stringLiteral(value)
  } else if (typeof value === 'number') {
    return t.numericLiteral(value)
  } else if (Array.isArray(value)) {
    return t.arrayExpression(value.map((v) => valueToAST(v)))
  } else {
    throw new Error('PluginError: unsupported type given to valueToCode')
  }
}
