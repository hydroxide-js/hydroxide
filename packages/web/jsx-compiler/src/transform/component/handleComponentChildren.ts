import { types as t } from '@babel/core'
import { ChildPath } from '../../types'
import { elementToTemplate } from '../../utils/elementToTemplate'
import { jsxFragmentError } from '../../utils/errors'
import { isPathOf } from '../../utils/isPath'
import { wrapInArrow } from '../../utils/wrapInArrow'

export function handleComponentChildren(children: ChildPath[]) {
  const childrenExprs: (t.Expression | t.Literal | t.SpreadElement)[] = []

  children.forEach((childPath) => {
    // JSXElement
    if (isPathOf.JSXElement(childPath)) {
      childrenExprs.push(elementToTemplate(childPath))
    }

    // JSXExpressionContainer
    else if (isPathOf.JSXExpressionContainer(childPath)) {
      const expr = childPath.node.expression
      if (t.isJSXEmptyExpression(expr)) return
      if (t.isLiteral(expr) || t.isIdentifier(expr)) {
        childrenExprs.push(expr)
      } else {
        childrenExprs.push(wrapInArrow(expr))
      }
    }

    // JSXText
    else if (isPathOf.JSXText(childPath)) {
      // replace multiple consequtive wihitespace with single space
      // and trim start and end
      const text = childPath.node.value.trim()

      // ignore empty text
      if (text === '') {
        return
      }
      childrenExprs.push(t.stringLiteral(text))
    }

    // JSXSpreadChild
    else if (isPathOf.JSXSpreadChild(childPath)) {
      const spreadExpr = t.spreadElement(childPath.node.expression)
      childrenExprs.push(spreadExpr)
    }

    // Fragment
    else {
      throw jsxFragmentError(childPath)
    }
  })

  return childrenExprs
}
