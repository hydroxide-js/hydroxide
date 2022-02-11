import { isReactive } from '@nuejs/core'
import { DynamicParts } from '../types/DynamicPart'
import { NodeAddress } from '../utils/getNodeByAddress'
import { isObject } from '../utils/isObject'
import { nueElementToHTML } from './nueElementToHTML'
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
  if (!isObject(jsxElement)) {
    return primitivesToHTML(jsxElement)
  } else if (isReactive(jsxElement)) {
    return reactiveToHTML(dynamicParts, domAddress, jsxAddress)
  } else {
    return nueElementToHTML(jsxElement, dynamicParts, domAddress, jsxAddress)
  }
}
