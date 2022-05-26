import { NodePath, types as t } from '@babel/core'
import { marker } from '../config'
import { Hydrate } from '../hydration/hydration'
import { JSXInfo } from '../types'
import { elementToTemplate } from '../utils/elementToTemplate'
import { removeAttributeFromElement } from '../utils/removeAttribute'
import { wrapInArrow } from '../utils/wrapInArrow'

export function handleConditionalElement(
  address: number[],
  jsxNodePath: NodePath<t.JSXElement>,
  ifAttr: t.JSXAttribute
): JSXInfo {
  // remove if to prevent infinite loop when processJSX is called for this node
  removeAttributeFromElement(jsxNodePath.node, ifAttr)

  // no value or value is not expression
  if (
    !ifAttr.value ||
    !t.isJSXExpressionContainer(ifAttr.value) ||
    t.isJSXEmptyExpression(ifAttr.value.expression)
  ) {
    throw jsxNodePath.buildCodeFrameError('Invalid Conditional Attribute Value')
  }

  return {
    html: marker,
    expressions: [
      t.arrayExpression([
        wrapInArrow(ifAttr.value.expression),
        elementToTemplate(jsxNodePath)
      ])
    ],
    hydrations: [Hydrate.$CondEl(address)],
    type: 'element'
  }
}
