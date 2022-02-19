import { DynamicPart, DynamicParts } from '../types/DynamicPart'
import { isObject } from '../utils/isObject'
import { NodeAddress } from '../utils/queryDOM'
import { sanitize } from '../utils/sanitize'

export function handleAttributes(
  props: JSX.props,
  markup: string[],
  domAddress: NodeAddress,
  jsxAddress: NodeAddress,
  dynamicParts: DynamicParts
) {
  for (const attributeName in props) {
    const attributeValue = props[attributeName]

    // static
    if (!isObject(attributeValue) && typeof attributeValue !== 'function') {
      // if attributeValue has " in it, it can break of out value
      markup.push(`${attributeName}="${sanitize(attributeValue)}" `)
    }

    // event
    else if (attributeName.startsWith('on')) {
      const dynamicEvent: DynamicPart.EventHandler = {
        domAddress: domAddress,
        jsxAddress: jsxAddress,
        propName: attributeName,
        event: attributeName.substring(2).toLowerCase()
      }

      dynamicParts.push(dynamicEvent)
    }

    // other attributes
    else {
      const dynamicAttribute: DynamicPart.Attribute = {
        domAddress: domAddress,
        jsxAddress: jsxAddress,
        attribute: attributeName
      }

      dynamicParts.push(dynamicAttribute)
    }
  }
}
