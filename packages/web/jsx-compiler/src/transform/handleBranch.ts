import { NodePath, types as t } from '@babel/core'
import { marker } from '../config'
import { CompHydration, JSXInfo } from '../types'
import { createHydrator } from '../utils/elementToTemplate'
import { has$Attr } from '../utils/hasIf'
import { isPathOf } from '../utils/isPath'
import { removeAttribute } from '../utils/removeAttribute'
import { wrapInArrow } from '../utils/wrapInArrow'
import { handleJSXElement } from './element/handleJSXElement'

function processConditionalNode(jsxElementPath: NodePath<t.JSXElement>) {
  const jsxInfo = handleJSXElement(jsxElementPath, [])

  // address is not really required, because we will ignore the hydrations anyway
  // const jsxInfo = handleJSXElement(jsxElementPath, [])

  // component
  if (jsxInfo.type === 'component') {
    return wrapInArrow((jsxInfo.hydrations[0] as CompHydration).data)
  }
  // element
  else {
    return wrapInArrow(createHydrator(jsxInfo.html, jsxInfo.hydrations))
  }
}

/**
 * if a branch starts at the given node - process the branch and return JSXInfo
 * if no branch, return undefined
 */
export function handleBranch(
  address: number[],
  jsxNodePath: NodePath<t.JSXElement>
): JSXInfo {
  const branches: t.Expression[] = []
  const attributes = jsxNodePath.node.openingElement.attributes
  const ifAttr = has$Attr(attributes, 'if')!

  if (
    !t.isJSXExpressionContainer(ifAttr.value) ||
    t.isJSXEmptyExpression(ifAttr.value.expression)
  ) {
    throw jsxNodePath.buildCodeFrameError('invalid value for $:if')
  }

  // remove $:if to avoid infinite loop
  removeAttribute(attributes, ifAttr)

  branches.push(
    t.arrayExpression([
      wrapInArrow(ifAttr.value.expression),
      processConditionalNode(jsxNodePath)
    ])
  )

  let next: NodePath<t.Node> = jsxNodePath

  while (true) {
    const sibling = next.getNextSibling()
    next = sibling

    // break if no next sibling
    if (!sibling) break

    if (isPathOf.JSXText(sibling)) {
      // if text node is whitespace only
      // remove it and continue
      if (sibling.node.value.trim() === '') {
        sibling.remove()
        continue
      }
    }

    if (isPathOf.JSXElement(sibling)) {
      const attributes = sibling.node.openingElement.attributes

      // $:else
      const elseAttr = has$Attr(attributes, 'else')
      if (elseAttr) {
        removeAttribute(attributes, elseAttr)

        branches.push(
          t.arrayExpression([
            t.arrowFunctionExpression([], t.identifier('true')),
            processConditionalNode(sibling)
          ])
        )
        sibling.remove()
        break
      }

      // $:else-if
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
              processConditionalNode(sibling)
            ])
          )

          sibling.remove()
        } else {
          sibling.buildCodeFrameError('invalid condition attribute value')
        }
      }
    }

    // break if next sibling is not a JSXElement
    else {
      break
    }
  }

  return {
    html: marker,
    hydrations: [
      {
        type: 'Branch',
        address,
        data: branches
      }
    ],
    type: 'element'
  }
}
