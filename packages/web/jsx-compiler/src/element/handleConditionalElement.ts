import { NodePath, types as t } from '@babel/core'
import { conditionalElHydration } from '../hydration/hydration'
import { marker } from '../marker'
import { Output } from '../types'
import { elementToTemplate } from '../utils/elementToTemplate'
import { removeAttributeFromElement } from '../utils/removeAttribute'

const InvalidConditionAttributeValue = 'Invalid Conditional Attribute Value'

export function handleConditionalElement(
  address: number[],
  jsxNodePath: NodePath<t.JSXElement>,
  ifAttr: t.JSXAttribute
): Output {
  // remove if to prevent infinite loop when processJSX is called for this node
  removeAttributeFromElement(jsxNodePath.node, ifAttr)

  // no value or value is not expression
  if (
    !ifAttr.value ||
    !t.isJSXExpressionContainer(ifAttr.value) ||
    t.isJSXEmptyExpression(ifAttr.value.expression)
  ) {
    throw jsxNodePath.buildCodeFrameError(InvalidConditionAttributeValue)
  }

  return [
    marker,
    [
      t.arrayExpression([
        ifAttr.value.expression,
        elementToTemplate(jsxNodePath)
      ])
    ],
    [conditionalElHydration(address)]
  ]
}
