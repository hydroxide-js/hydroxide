import { NodePath, types as t } from '@babel/core'
import { config } from '../config'
import { attrHydration, propsHydration } from '../hydration/hydration'
import { Hydration } from '../hydration/types'
import { JSXAttributePath, PropList } from '../types'
import { valueToAST } from '../utils/valueToAST'

function replaceSingleQuotes(str: string) {
  return str.replace(/'/g, '"')
}

export function handleElementAttributes(
  path: NodePath<t.JSXElement>,
  hydrations: any[],
  address: number[],
  exprs: t.Expression[]
) {
  // if there is a spread attribute used on element
  // all attributes need to be saved in a single object

  const attributePaths = path.get(
    'openingElement.attributes'
  ) as JSXAttributePath[]

  let str = ''

  const hasSpread = attributePaths.some((atPath) =>
    t.isJSXSpreadAttribute(atPath.node)
  )

  const shouldCollectProps = hasSpread

  const propList: PropList = []

  function embed(name: string, value: string) {
    str += ` ${name}='${replaceSingleQuotes(value)}'`
  }

  attributePaths.forEach((attributePath) => {
    // {...X}
    if (t.isJSXSpreadAttribute(attributePath.node)) {
      propList.push(t.spreadElement(attributePath.node.argument))
    }

    // normal
    else {
      const { name, value } = attributePath.node

      // xxx:yyy={zzz}
      if (t.isJSXNamespacedName(name)) {
        // on:XXX
        if (name.namespace.name === 'on') {
          if (
            t.isJSXExpressionContainer(value) &&
            !t.isJSXEmptyExpression(value.expression)
          ) {
            const eventName = name.name.name
            hydrations.push(
              valueToAST([address, Hydration.Types.Event, eventName])
            )
            exprs.push(value.expression)
          } else {
            throw attributePath.buildCodeFrameError('invalid attribute value')
          }
        }

        // $:XXX
        else if (name.namespace.name === '$') {
          const attrName = name.name.name
          if (
            t.isJSXExpressionContainer(value) &&
            !t.isJSXEmptyExpression(value.expression)
          ) {
            if (config.bindAttributes.has(attrName)) {
              hydrations.push(
                valueToAST([address, Hydration.Types.BindAttr, attrName])
              )
              exprs.push(value.expression)
            } else {
              throw attributePath.buildCodeFrameError('Unrecognized attribute')
            }
          } else {
            throw attributePath.buildCodeFrameError('Invalid attribute value')
          }
        }

        // else ignore
      }

      // xxx={yyy} or xxx='yyy' or xxx
      else {
        // xxx
        if (!value) {
          str += ` ${name.name}`
        }

        // xxx='yyy'
        if (t.isStringLiteral(value)) {
          if (!shouldCollectProps) {
            embed(name.name, value.value)
          } else {
            propList.push(t.objectProperty(t.identifier(name.name), value))
          }
        }

        // xxx={yyy}
        else if (t.isJSXExpressionContainer(value)) {
          // xxx={}
          if (t.isJSXEmptyExpression(value.expression)) {
            throw attributePath.buildCodeFrameError(
              'attribute value can not be JSXEmptyExpression'
            )
          }

          const expr = value.expression

          // if attributes to be collected
          if (shouldCollectProps) {
            propList.push(
              t.objectProperty(
                t.identifier(name.name),
                value.expression as t.Expression
              )
            )
          }

          hydrations.push(attrHydration(name.name, address))
          exprs.push(expr)
        }
      }
    }
  })

  if (hasSpread) {
    exprs.push(t.objectExpression(propList))
    hydrations.push(propsHydration(address))
  }

  return str
}
