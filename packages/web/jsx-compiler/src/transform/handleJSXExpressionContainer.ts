import { NodePath, types as t } from '@babel/core'
import { marker } from '../config'
import { Hydrate } from '../hydration/hydration'
import { JSXInfo } from '../types'
import { handleExpressionContainer } from '../utils/handleExpression'
import { valueOfSLiteral } from '../utils/SLiteral'
import { wrapInArrow } from '../utils/wrapInArrow'

export function handleJSXExpressionContainer(
  path: NodePath<t.JSXExpressionContainer>,
  address: number[]
) {
  const jsxInfo: JSXInfo = {
    html: '',
    expressions: [],
    hydrations: [],
    type: 'expr'
  }

  handleExpressionContainer(path.node, {
    Empty() {
      // ignore comments
      jsxInfo.type = 'ignore'
    },
    null() {
      // ignore
      jsxInfo.type = 'ignore'
    },
    undefined() {
      // ignore
      jsxInfo.type = 'ignore'
    },
    SLiteral(expr) {
      // embed
      jsxInfo.html = valueOfSLiteral(expr) + ''
      jsxInfo.type = 'text_from_expr'
    },
    Expr(expr) {
      jsxInfo.html = marker
      // wrap it with function
      if (t.isIdentifier(expr)) {
        // don't wrap identifiers on embeds
        jsxInfo.expressions = [expr]
      } else {
        jsxInfo.expressions = [wrapInArrow(expr)]
      }
      jsxInfo.hydrations = [Hydrate.$Embed(address)]
    }
  })

  return jsxInfo
}
