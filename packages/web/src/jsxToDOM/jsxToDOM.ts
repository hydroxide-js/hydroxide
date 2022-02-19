import { isReactive } from '@nuejs/core'
import { DynamicParts } from '../types/DynamicPart'
import { isObject } from '../utils/isObject'
import { NodeAddress } from '../utils/queryDOM'
import { jsxHtmlElementToHTML } from './jsxHtmlElementToHTML'
import { primitivesToHTML } from './primitivesToHTML'
import { reactiveToHTML } from './reactiveToHTML'

export function jsxToDOM(
  jsxElement: JSX.Element
): [html: string, dynamicParts: DynamicParts] {
  const dynamicParts: DynamicParts = []
  const html = jsxToHTML(jsxElement, dynamicParts)
  return [html, dynamicParts]
}

export function jsxToHTML(
  jsxElement: JSX.Element,
  dynamicParts: DynamicParts,
  domAddress: NodeAddress = [],
  jsxAddress: NodeAddress = []
): string {
  if (isObject(jsxElement)) {
    if ('jsxTag' in jsxElement) {
      return jsxHtmlElementToHTML(
        jsxElement,
        dynamicParts,
        domAddress,
        jsxAddress
      )
    } else if (isReactive(jsxElement)) {
      return reactiveToHTML(dynamicParts, domAddress, jsxAddress)
    } else {
      if (process.env.NODE_ENV !== 'production') {
        // @ts-ignore
        window.reportError('object serialized as text', jsxElement)
      }
      return ''
    }
  } else {
    return primitivesToHTML(jsxElement)
  }
}
