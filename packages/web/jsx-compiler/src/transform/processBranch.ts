import { NodePath, types as t } from '@babel/core'
import { marker, requiredImport } from '../config'
import { Hydration, JSXInfo } from '../types'
import { ids, wrapInArrowIfNeeded } from '../utils/build'
import { has$Attr, isPathOf } from '../utils/check'
import { removeAttribute } from '../utils/modify'
import { processJSXElement } from './processJSXElement'
import { createHydrator } from './transformJSX'

/**
 * if a branch starts at the given node - process the branch and return JSXInfo
 * if no branch, return undefined
 */
export function processBranch(
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
      wrapInArrowIfNeeded(ifAttr.value.expression),
      processConditional(jsxNodePath)
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
            processConditional(sibling)
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
              wrapInArrowIfNeeded(elseIfAttr.value.expression),
              processConditional(sibling)
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

function processConditional(jsxElementPath: NodePath<t.JSXElement>) {
  const jsxInfo = processJSXElement(jsxElementPath, [])

  if (jsxInfo.type === 'component') {
    const args = (jsxInfo.hydrations[0] as Hydration.Comp).data
    // () => component()
    requiredImport.component()
    return t.arrowFunctionExpression([], t.callExpression(ids.component, args))
  } else {
    // () => (() => {})()
    return t.arrowFunctionExpression(
      [],
      createHydrator(jsxInfo.html, jsxInfo.hydrations)
    )
  }
}
