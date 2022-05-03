import { NodePath, types as t } from '@babel/core'
import { Hydration } from '../hydration/types'
import { marker } from '../marker'
import { Output } from '../types'
import { elementToTemplate } from '../utils/elementToTemplate'
import { hasElse, hasElseIf, hasIf } from '../utils/hasIf'
import { isPathOf } from '../utils/isPath'
import { removeAttribute } from '../utils/removeAttribute'
import { valueToAST } from '../utils/valueToAST'

export function handleBranch(
  address: number[],
  jsxNodePath: NodePath<t.JSXElement>
): Output | undefined {
  const branches: t.Expression[] = []
  const attributes = jsxNodePath.node.openingElement.attributes

  const ifAttr = hasIf(attributes)

  if (!ifAttr) return

  if (!t.isJSXExpressionContainer(ifAttr.value)) {
    throw jsxNodePath.buildCodeFrameError('invalid if condition value')
  }

  if (t.isJSXEmptyExpression(ifAttr.value.expression)) {
    throw jsxNodePath.buildCodeFrameError('invalid if condition value')
  }

  let next = jsxNodePath

  while (true) {
    const sibling = jsxNodePath.getNextSibling()
    if (isPathOf.JSXElement(sibling)) {
      next = sibling

      const attributes = next.node.openingElement.attributes

      // else
      const elseAttr = hasElse(attributes)
      if (elseAttr) {
        removeAttribute(attributes, elseAttr)
        branches.push(elementToTemplate(next))
        next.remove()
        break
      }

      // else-if
      const elseIfAttr = hasElseIf(attributes)
      if (!elseIfAttr) break
      else {
        removeAttribute(attributes, elseIfAttr)

        if (t.isJSXExpressionContainer(elseIfAttr.value)) {
          if (t.isJSXEmptyExpression(elseIfAttr.value.expression)) {
            throw jsxNodePath.buildCodeFrameError(
              'invalid else-if condition value'
            )
          }

          branches.push(
            t.arrayExpression([
              elseIfAttr.value.expression,
              elementToTemplate(next)
            ])
          )

          next.remove()
        } else {
          next.buildCodeFrameError('invalid condition attribute value')
        }
      }
    } else {
      break
    }
  }

  if (branches.length) {
    removeAttribute(attributes, ifAttr)
    branches.unshift(
      t.arrayExpression([
        ifAttr.value.expression,
        elementToTemplate(jsxNodePath)
      ])
    )

    const hydrations = [valueToAST([Hydration.Types.Branch, address])]
    const exprs = [t.arrayExpression(branches)]
    return [marker, exprs, hydrations]
  }

  return undefined
}
