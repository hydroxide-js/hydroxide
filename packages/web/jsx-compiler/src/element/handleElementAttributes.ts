import { NodePath, types as t } from '@babel/core'
import { Hydrate } from '../hydration/hydration'
import { JSXAttributePath, JSXInfo, PropList } from '../types'
import { handleExpressionContainer } from '../utils/handleExpression'
import { valueOfSLiteral } from '../utils/SLiteral'
import { wrapInArrow } from '../utils/wrapInArrow'

function replaceSingleQuotes(str: string) {
  return str.replace(/'/g, '"')
}

function getAttrName(name: t.JSXNamespacedName | t.JSXIdentifier) {
  if (t.isJSXNamespacedName(name)) {
    return name.namespace.name + ':' + name.name.name
  } else {
    return name.name
  }
}

export function handleElementAttributes(
  elementJSXInfo: JSXInfo,
  elementPath: NodePath<t.JSXElement>,
  address: number[]
) {
  // if there is a spread attribute used on element
  // all attributes need to be saved in a single object

  const attributePaths = elementPath.get(
    'openingElement.attributes'
  ) as JSXAttributePath[]

  let markup = ''

  const propList: PropList = []

  function embed(name: string, value: string) {
    markup += ` ${name}='${replaceSingleQuotes(value)}'`
  }

  function addExprToPropList(
    name: t.JSXNamespacedName | t.JSXIdentifier,
    expr: t.Expression
  ) {
    propList.push(t.objectProperty(t.stringLiteral(getAttrName(name)), expr))
  }

  attributePaths.forEach((attributePath) => {
    // spread attribute {...X}
    if (t.isJSXSpreadAttribute(attributePath.node)) {
      throw attributePath.buildCodeFrameError(
        'Attribute Spreading is not allowed'
      )
      // propList.push(t.spreadElement(attributePath.node.argument))
    }

    // normal
    else {
      const { name, value } = attributePath.node

      // xxx={yyy} or xxx='yyy' or xxx
      // xxx
      if (!value) {
        // if there is no value, then it is a boolean attribute and does not require any value to be specified
        markup += ` ${name.name}`
      }

      // xxx="yyy" -> { 'xxx': 'yyy' }
      if (t.isStringLiteral(value)) {
        embed(getAttrName(name), value.value)
      }

      // xxx={yyy}
      else if (t.isJSXExpressionContainer(value)) {
        handleExpressionContainer(value, {
          Empty() {
            throw attributePath.buildCodeFrameError(
              'attribute value can not be an empty jsx expression'
            )
          },
          null() {
            // ignore (remove) attribute
          },
          undefined() {
            // ignore (remove) attribute
          },
          SLiteral(expr) {
            embed(getAttrName(name), valueOfSLiteral(expr) + '')
          },
          Expr(expr) {
            // wrap the value in arrow
            addExprToPropList(name, wrapInArrow(expr))
          }
        })
      }
    }
  })

  if (propList.length !== 0) {
    elementJSXInfo.expressions.push(t.objectExpression(propList))
    elementJSXInfo.hydrations.push(Hydrate.$Attr(address))
  }

  elementJSXInfo.html += markup
}
