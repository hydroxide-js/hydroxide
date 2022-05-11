import { NodePath, types as t } from '@babel/core'
import { marker } from '../config'
import { Hydrate } from '../hydration/hydration'
import { JSXInfo } from '../types'
import { handleExpressionContainer } from '../utils/handleExpression'
import { valueOfSLiteral } from '../utils/SLiteral'

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
      jsxInfo.type = 'ignore'
    },
    null() {
      jsxInfo.type = 'ignore'
    },
    undefined() {
      jsxInfo.type = 'ignore'
    },
    SLiteral(expr) {
      jsxInfo.html = valueOfSLiteral(expr) + ''
      jsxInfo.type = 'text_from_expr'
    },
    Expr(expr) {
      jsxInfo.html = marker
      jsxInfo.expressions = [expr]
      jsxInfo.hydrations = [Hydrate.$Embed(address)]
    }
  })

  return jsxInfo
}
