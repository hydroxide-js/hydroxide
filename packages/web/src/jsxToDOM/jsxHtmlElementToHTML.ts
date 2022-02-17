import { component } from '@nuejs/core'
import { DynamicPart, DynamicParts } from '../types/DynamicPart'
import { NodeAddress } from '../utils/getNodeByAddress'
import { sanitize } from '../utils/sanitize'
import { handleChildren } from './handleChildren'
import { commentMarker } from './markers'

export function jsxHtmlElementToHTML(
  jsxElement: JSX.HtmlElement,
  dynamicParts: DynamicParts,
  domAddress: NodeAddress = [],
  jsxAddress: NodeAddress = []
) {
  const { type, props } = jsxElement
  const isConditional = '$if' in props

  // intrinsic elements
  if (typeof type === 'string') {
    if (isConditional) {
      // jsxElement but props.$if remove to avoid infinite loop of component creation
      const modifiedJSXElement = cloneJSXandRemoveIf(jsxElement)

      dynamicParts.push({
        comp: component(() => modifiedJSXElement),
        conditional: true,
        jsxAddress: jsxAddress,
        domAddress: domAddress,
        conditionalEl: true
      })

      return commentMarker
    }

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
    const dynamicPart: DynamicPart.Component = {
      domAddress: domAddress,
      jsxAddress: jsxAddress,
      comp: type
    }

    if (isConditional) {
      dynamicPart.conditional = true
    }

    dynamicParts.push(dynamicPart)

    return commentMarker
  }
}

export function cloneJSXandRemoveIf(jsxElement: JSX.HtmlElement) {
  const modifiedJSXElement = { ...jsxElement }

  // should not have the $if
  modifiedJSXElement.props = {}
  for (const p in jsxElement.props) {
    if (p !== '$if') {
      modifiedJSXElement.props[p] = jsxElement.props[p]
    }
  }
  return modifiedJSXElement
}
