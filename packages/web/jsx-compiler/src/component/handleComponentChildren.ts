import { NodePath, types as t } from '@babel/core'
import { jsxFragmentError } from '../errors'
import { elementToTemplate } from '../utils/elementToTemplate'
import { isPathOf } from '../utils/isPath'
import { DataContainer } from './handleComponent'

export type ChildPath =
  | NodePath<t.JSXElement>
  | NodePath<t.JSXExpressionContainer>
  | NodePath<t.JSXSpreadChild>
  | NodePath<t.JSXFragment>
  | NodePath<t.JSXText>

export function handleComponentChildren(
  data: DataContainer,
  children: ChildPath[]
) {
  children.forEach((childPath) => {
    // JSXElement
    if (isPathOf.JSXElement(childPath)) {
      data.children.push(elementToTemplate(childPath))
    }

    // JSXExpressionContainer
    else if (isPathOf.JSXExpressionContainer(childPath)) {
      if (t.isJSXEmptyExpression(childPath.node.expression)) return
      data.children.push(childPath.node.expression)
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
      data.children.push(t.stringLiteral(text))
    }

    // JSXSpreadChild
    else if (isPathOf.JSXSpreadChild(childPath)) {
      const spreadExpr = t.spreadElement(childPath.node.expression)
      data.children.push(spreadExpr)
    }

    // Fragment
    else {
      throw jsxFragmentError(childPath)
    }
  })
}
