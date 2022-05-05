import { NodePath, types as t } from '@babel/core'
import { attributesHydration } from '../hydration/hydration'
import { JSXAttributePath, PropList } from '../types'
import { handleExpressionContainer } from '../utils/handleExpression'
import { valueOfSLiteral } from '../utils/SLiteral'

function replaceSingleQuotes(str: string) {
  return str.replace(/'/g, '"')
}

export function handleElementAttributes(
  elementPath: NodePath<t.JSXElement>,
  hydrations: any[],
  address: number[],
  exprs: t.Expression[]
) {
  // if there is a spread attribute used on element
  // all attributes need to be saved in a single object

  const attributePaths = elementPath.get(
    'openingElement.attributes'
  ) as JSXAttributePath[]

  let markup = ''

  // if there is spread, all the attributes need to be stored in object because of overrides
  const hasSpread = attributePaths.some((atPath) =>
    t.isJSXSpreadAttribute(atPath.node)
  )

  const propList: PropList = []

  function embed(name: string, value: string) {
    markup += ` ${name}='${replaceSingleQuotes(value)}'`
  }

  function getAttrName(name: t.JSXNamespacedName | t.JSXIdentifier) {
    if (t.isJSXNamespacedName(name)) {
      return name.namespace.name + ':' + name.name.name
    } else {
      return name.name
    }
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
      propList.push(t.spreadElement(attributePath.node.argument))
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
        if (!hasSpread) {
          embed(getAttrName(name), value.value)
        } else {
          addExprToPropList(name, value)
        }
      }

      // xxx={yyy}
      else if (t.isJSXExpressionContainer(value)) {
        handleExpressionContainer(value, {
          Empty() {
            throw attributePath.buildCodeFrameError(
              'attribute value can not be an empty jsx expression'
            )
          },
          null(expr) {
            // ignore unless spread
            if (hasSpread) {
              addExprToPropList(name, expr)
            }
          },
          undefined(expr) {
            // ignore unless spread
            if (hasSpread) {
              addExprToPropList(name, expr)
            }
          },
          SLiteral(expr) {
            // static attribute
            if (!hasSpread) {
              // embed in html
              embed(getAttrName(name), valueOfSLiteral(expr) + '')
            } else {
              addExprToPropList(name, expr)
            }
          },
          Expr(expr) {
            addExprToPropList(name, expr)
          }
        })
      }
    }
  })

  if (propList.length !== 0) {
    exprs.push(t.objectExpression(propList))
    hydrations.push(attributesHydration(address))
  }

  return markup
}
