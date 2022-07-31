import * as t from '@babel/types'
import { NodePath } from '@babel/traverse'
import { config, marker } from '../../config'
import { JSXInfo } from '../../types'
import { wrapInArrowIfNeeded } from '../../utils/build'
import { handleExpressionContainer, valueOfSLiteral } from '../../utils/process'

export function processExpressionContainer(
  path: NodePath<t.JSXExpressionContainer>,
  address: number[]
) {
  const jsxInfo: JSXInfo = {
    html: '',
    hydrations: [],
    type: 'expr',
    ssrExprs: [],
    markersAdded: 0
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
      jsxInfo.type = 'text'
    },
    Expr(expr) {
      jsxInfo.html = marker
      jsxInfo.markersAdded++
      if (config.type === 'ssr-server') {
        jsxInfo.ssrExprs.push(expr)
      } else {
        jsxInfo.hydrations.push({
          type: 'Insert',
          data: wrapInArrowIfNeeded(expr),
          address
        })
      }
    }
  })

  return jsxInfo
}
