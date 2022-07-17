import * as t from '@babel/types'
import { NodePath } from '@babel/traverse'
import { marker } from '../config'
import { JSXInfo } from '../types'
import { wrapInArrowIfNeeded } from '../utils/build'
import { getAttr, isPathOf } from '../utils/check'
import { removeAttribute } from '../utils/modify'
import { transformJSXPath } from './transformJSX'

/**
 * if a branch starts at the given node - process the branch and return JSXInfo
 * if no branch, return undefined
 */
export function processBranch(
  address: number[],
  jsxNodePath: NodePath<t.JSXElement>
): JSXInfo {
  const branches: t.Expression[] = []
  const ifAttr = getAttr(jsxNodePath.node, 'if')!

  if (
    !t.isJSXExpressionContainer(ifAttr.value) ||
    t.isJSXEmptyExpression(ifAttr.value.expression)
  ) {
    throw jsxNodePath.buildCodeFrameError('Invalid value for a conditional attribute')
  }

  // remove if attribute to avoid infinite loop
  removeAttribute(jsxNodePath.node, ifAttr)

  branches.push(
    t.arrayExpression([
      wrapInArrowIfNeeded(ifAttr.value.expression),
      transformConditional(jsxNodePath)
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
      // else
      const elseAttr = getAttr(sibling.node, 'else')
      if (elseAttr) {
        removeAttribute(sibling.node, elseAttr)
        branches.push(
          t.arrayExpression([
            t.arrowFunctionExpression([], t.identifier('true')),
            transformConditional(sibling)
          ])
        )
        sibling.remove()
        break
      }

      // elseIf
      const elseIfAttr = getAttr(sibling.node, 'elseIf')
      if (!elseIfAttr) break
      else {
        removeAttribute(sibling.node, elseIfAttr)

        if (t.isJSXExpressionContainer(elseIfAttr.value)) {
          if (t.isJSXEmptyExpression(elseIfAttr.value.expression)) {
            throw jsxNodePath.buildCodeFrameError(
              'Invalid value for a conditional attribute'
            )
          }

          branches.push(
            t.arrayExpression([
              wrapInArrowIfNeeded(elseIfAttr.value.expression),
              transformConditional(sibling)
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

function transformConditional(jsxElementPath: NodePath<t.JSXElement>) {
  return t.arrowFunctionExpression([], transformJSXPath(jsxElementPath))
}
