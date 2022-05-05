import { NodePath, types as t, types } from '@babel/core'
import { processJSX } from '../processJSX'
import { registerTemplate } from './registerTemplate'

/**
 * convert the jsxElement to template callexpression
 * <> ... </> => _T(...)
 */
export function elementToTemplate(path: NodePath<types.JSXElement>) {
  const { html, expressions, hydrations } = processJSX(path, [])
  const minifiedHTML = html.replace(/\s+/g, ' ')
  const templateId = registerTemplate(minifiedHTML, hydrations)
  const callExpr = t.callExpression(templateId, expressions)
  return callExpr
}
