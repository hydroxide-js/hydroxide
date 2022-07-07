import * as t from '@babel/types'
import { NodePath } from '@babel/traverse'
import { programInfo } from '../../programInfo'
import { Hydration, JSXAttributePath, JSXInfo } from '../../types'
import {
  escape,
  getAttrName,
  handleExpressionContainer,
  valueOfSLiteral
} from '../../utils/process'

export function processAttributes(
  elementJSXInfo: JSXInfo,
  elementPath: NodePath<t.JSXElement>,
  address: number[]
) {
  const attributePaths = elementPath.get(
    'openingElement.attributes'
  ) as JSXAttributePath[]

  let markup = ''

  const attributes: { name: string; value: t.Expression }[] = []

  function embed(name: string, value: string) {
    markup += ` ${name}='${escape(value)}'`
  }

  attributePaths.forEach((attributePath) => {
    // spread attribute {...X}
    if (t.isJSXSpreadAttribute(attributePath.node)) {
      throw attributePath.buildCodeFrameError('Attribute Spreading is not allowed')
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
        const fullname = getAttrName(name)
        if (fullname.startsWith('prop:')) {
          const staticPropHydration: Hydration.StaticProp = {
            type: 'StaticProp',
            data: {
              name: fullname.substring(5),
              value: value
            },
            address
          }

          elementJSXInfo.hydrations.push(staticPropHydration)
        } else {
          embed(getAttrName(name), value.value)
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
          null() {
            // ignore (remove) attribute
          },
          undefined() {
            // ignore (remove) attribute
          },
          SLiteral(expr) {
            const fullName = getAttrName(name)

            if (fullName.startsWith('prop:')) {
              elementJSXInfo.hydrations.push({
                type: 'StaticProp',
                data: {
                  name: fullName.substring(5),
                  value: t.stringLiteral(valueOfSLiteral(expr) + '')
                },
                address
              } as Hydration.StaticProp)
            } else {
              embed(fullName, valueOfSLiteral(expr) + '')
            }
          },
          Expr(expr) {
            const fullName = getAttrName(name)

            // events
            if (fullName.startsWith('on:')) {
              const eventName = fullName.substring(3)
              // register event
              programInfo.usedEvents.add(eventName)
              elementJSXInfo.hydrations.push({
                type: 'Event',
                address,
                data: [eventName, expr]
              })
            } else if (fullName.startsWith('$:ref')) {
              elementJSXInfo.hydrations.push({
                type: 'Ref',
                address,
                data: expr
              } as Hydration.Ref)
            }

            // other
            else {
              const isStatic = t.isIdentifier(expr)

              if (isStatic) {
                if (fullName.startsWith('prop:')) {
                  // static prop hydration
                  elementJSXInfo.hydrations.push({
                    type: 'StaticProp',
                    data: { name: fullName.substring(5), value: expr },
                    address
                  } as Hydration.StaticProp)
                } else {
                  // static attribute hydration
                  elementJSXInfo.hydrations.push({
                    type: 'StaticAttr',
                    data: { name: fullName, value: expr },
                    address
                  } as Hydration.StaticAttr)
                }
              } else {
                attributes.push({
                  name: fullName,
                  value: expr
                })
              }
            }
          }
        })
      }
    }
  })

  elementJSXInfo.html += markup
  if (attributes.length === 0) return

  if (attributes.length === 1) {
    if (attributes[0].name.startsWith('prop:')) {
      elementJSXInfo.hydrations.push({
        type: 'SingleProp',
        address,
        data: {
          name: attributes[0].name.substring(5),
          value: attributes[0].value
        }
      } as Hydration.SingleProp)
    } else {
      elementJSXInfo.hydrations.push({
        type: 'SingleAttr',
        address,
        data: attributes[0]
      } as Hydration.SingleAttr)
    }
  } else {
    // multiple
    elementJSXInfo.hydrations.push({
      type: 'MultipleAttr',
      data: attributes,
      address
    } as Hydration.MultipleAttr)
  }
}
