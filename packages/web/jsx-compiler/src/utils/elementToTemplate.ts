import { NodePath, types as t, types } from '@babel/core'
import { processJSX } from '../processJSX'
import { registerTemplate } from './registerTemplate'

/**
 * convert the jsxElement to template callexpression
 * <> ... </> => _T(...)
 */
export function elementToTemplate(path: NodePath<types.JSXElement>) {
  const [str, exprs, hydrations] = processJSX(path, [])
  const templateId = registerTemplate(str, hydrations)
  const callExpr = t.callExpression(templateId, exprs)
  return callExpr
}
