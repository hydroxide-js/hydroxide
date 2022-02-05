import { Reactive } from '@nuejs/core'
import { DynamicPart, DynamicParts, NodeAddress } from './types'

const commentMarker = '<!-- -->'

export function jsxToHTML(
  jsxElement: JSX.Element,
  dynamicParts: DynamicParts,
  nodeAddress: NodeAddress = []
): string {
  if (jsxElement === null || jsxElement === undefined) {
    return ''
  }

  // static text
  if (typeof jsxElement === 'string' || typeof jsxElement === 'number') {
    return '' + jsxElement
  }

  // reactive
  if (jsxElement instanceof Reactive) {
    const dynamicText: DynamicPart.Text = {
      nodeAddress: nodeAddress,
      text: true
    }

    dynamicParts.push(dynamicText)
    return commentMarker
  }

  const { type, props } = jsxElement

  // element
  if (typeof type === 'string') {
    const markup = [`<${type} `]

    // apply non-object props as attributes
    if (props) {
      Object.keys(props).forEach((attributeName) => {
        if (attributeName === 'children') return
        const attributeValue = props[attributeName]
        if (typeof attributeValue !== 'object' && typeof attributeValue !== 'function') {
          markup.push(`${attributeName}="${attributeValue}" `)
        } else {
          if (attributeName.startsWith('on')) {
            const dynamicEvent: DynamicPart.EventHandler = {
              nodeAddress: nodeAddress,
              propName: attributeName,
              event: attributeName.substring(2).toLowerCase()
            }

            dynamicParts.push(dynamicEvent)
          } else {
            const dynamicAttribute: DynamicPart.Attribute = {
              nodeAddress: nodeAddress,
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
      if (Array.isArray(props.children)) {
        props.children.forEach((child: JSX.Element, i: number) => {
          markup.push(jsxToHTML(child, dynamicParts, [...nodeAddress, i]))
        })
      } else {
        markup.push(jsxToHTML(props.children, dynamicParts, [...nodeAddress, 0]))
      }
    }

    markup.push(`</${type}>`)

    return markup.join('')
  }

  // component
  else {
    const dynamicComponent: DynamicPart.Component = {
      nodeAddress: nodeAddress,
      comp: true
    }

    dynamicParts.push(dynamicComponent)

    return commentMarker
  }
}
