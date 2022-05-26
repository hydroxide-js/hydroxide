import { NodePath, types as t } from '@babel/core'
import { marker } from '../config'
import { Hydration, JSXInfo } from '../types'
import { elementToTemplate } from '../utils/elementToTemplate'
import { has$Attr } from '../utils/hasIf'
import { isPathOf } from '../utils/isPath'
import { removeAttribute } from '../utils/removeAttribute'
import { valueToAST } from '../utils/valueToAST'
import { wrapInArrow } from '../utils/wrapInArrow'

/**
 * if a branch starts at the given node - process the branch and return JSXInfo
 * if no branch, return undefined
 */
export function handleBranch(
  address: number[],
  jsxNodePath: NodePath<t.JSXElement>
): JSXInfo | undefined {
  const branches: t.Expression[] = []
  const attributes = jsxNodePath.node.openingElement.attributes

  const ifAttr = has$Attr(attributes, 'if')

  if (!ifAttr) return

  if (
    !t.isJSXExpressionContainer(ifAttr.value) ||
    t.isJSXEmptyExpression(ifAttr.value.expression)
  ) {
    throw jsxNodePath.buildCodeFrameError('invalid if condition value')
  }

  let next: NodePath<t.Node> = jsxNodePath

  while (true) {
    const sibling = next.getNextSibling()
    next = sibling

    if (!sibling) break
    if (isPathOf.JSXText(sibling)) {
      // if text node is whitespace only continue
      if (sibling.node.value.trim() === '') {
        sibling.remove()
        continue
      }
    }

    if (isPathOf.JSXElement(sibling)) {
      const attributes = sibling.node.openingElement.attributes

      // else
      const elseAttr = has$Attr(attributes, 'else')
      if (elseAttr) {
        removeAttribute(attributes, elseAttr)
        branches.push(elementToTemplate(sibling))
        sibling.remove()
        break
      }

      // else-if
      const elseIfAttr = has$Attr(attributes, 'else-if')
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
              wrapInArrow(elseIfAttr.value.expression),
              elementToTemplate(sibling)
            ])
          )

          sibling.remove()
        } else {
          sibling.buildCodeFrameError('invalid condition attribute value')
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
        wrapInArrow(ifAttr.value.expression),
        elementToTemplate(jsxNodePath)
      ])
    )

    return {
      html: marker,
      expressions: [t.arrayExpression(branches)],
      hydrations: [valueToAST([Hydration.Types.Branch, address])],
      type: 'element'
    }
  }

  return undefined
}
