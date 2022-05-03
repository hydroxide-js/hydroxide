import { NodePath, types } from '@babel/core'
import { processJSX } from '../processJSX'
import { createElementCallExpr } from './createElement'
import { registerTemplate } from './registerTemplate'

export function elementToTemplate(path: NodePath<types.JSXElement>) {
  const [str, exprs, hydrations] = processJSX(path, [])
  const templateId = registerTemplate(str, hydrations)
  const callExpr = createElementCallExpr(templateId, exprs)
  return callExpr
}
