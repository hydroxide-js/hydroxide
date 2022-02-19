import { component } from '@nuejs/core'
import { DynamicPart, DynamicParts } from '../types/DynamicPart'
import { cloneJSXandRemoveIf } from '../utils/cloneJSXandRemoveIf'
import { NodeAddress } from '../utils/queryDOM'
import { handleAttributes } from './handleAttributes'
import { handleChildren } from './handleChildren'
import { commentMarker } from './markers'

/**
 * convert JSX.HtmlElement to html string
 * and record dynamicParts
 */
export function jsxHtmlElementToHTML(
  jsxElement: JSX.HtmlElement,
  dynamicParts: DynamicParts,
  domAddress: NodeAddress = [],
  jsxAddress: NodeAddress = []
) {
  const { jsxTag, props, children, $if } = jsxElement

  // elements
  if (typeof jsxTag === 'string') {
    // conditional element
    if ($if) {
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

    const markup = [`<${jsxTag} `]

    handleAttributes(props, markup, domAddress, jsxAddress, dynamicParts)

    markup.push('>')

    if (children) {
      handleChildren(children, markup, dynamicParts, domAddress, jsxAddress)
    }

    markup.push(`</${jsxTag}>`)

    return markup.join('')
  }

  // component
  else {
    const dynamicPart: DynamicPart.Component = {
      domAddress: domAddress,
      jsxAddress: jsxAddress,
      comp: jsxTag
    }

    if ($if) {
      dynamicPart.conditional = true
    }

    dynamicParts.push(dynamicPart)

    return commentMarker
  }
}
