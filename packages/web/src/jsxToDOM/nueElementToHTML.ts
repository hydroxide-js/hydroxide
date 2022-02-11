import { DynamicParts, DynamicPart } from '../types/DynamicPart'
import { NodeAddress } from '../utils/getNodeByAddress'
import { sanitize } from '../utils/sanitize'
import { handleChildren } from './handleChildren'
import { commentMarker } from './markers'

export function nueElementToHTML(
  jsxElement: JSX.NueElement,
  dynamicParts: DynamicParts,
  domAddress: NodeAddress = [],
  jsxAddress: NodeAddress = []
) {
  const { type, props } = jsxElement

  // element
  if (typeof type === 'string') {
    const markup = [`<${type} `]

    // apply non-object props as attributes
    if (props) {
      Object.keys(props).forEach((attributeName) => {
        // ignore children
        if (attributeName === 'children') return

        const attributeValue = props[attributeName]
        if (
          typeof attributeValue !== 'object' &&
          typeof attributeValue !== 'function'
        ) {
          markup.push(`${attributeName}="${sanitize(attributeValue)}" `)
        } else {
          if (attributeName.startsWith('on')) {
            const dynamicEvent: DynamicPart.EventHandler = {
              domAddress: domAddress,
              jsxAddress: jsxAddress,
              propName: attributeName,
              event: attributeName.substring(2).toLowerCase()
            }

            dynamicParts.push(dynamicEvent)
          } else {
            const dynamicAttribute: DynamicPart.Attribute = {
              domAddress: domAddress,
              jsxAddress: jsxAddress,
              attribute: attributeName
            }

            dynamicParts.push(dynamicAttribute)
          }
        }
      })
    }

    markup.push('>')

    // insert children if any
    if (props.children) {
      handleChildren(props, markup, dynamicParts, domAddress, jsxAddress)
    }

    markup.push(`</${type}>`)

    return markup.join('')
  }

  // component
  else {
    const dynamicComponent: DynamicPart.Component = {
      domAddress: domAddress,
      jsxAddress: jsxAddress,
      comp: true
    }

    dynamicParts.push(dynamicComponent)

    return commentMarker
  }
}
