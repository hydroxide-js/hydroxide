import { NodePath, types as t } from '@babel/core'
import { JSXInfo } from '../types'
import { handleElementAttributes } from './handleElementAttributes'
import { handleElementChildren } from './handleElementChildren'
import { isVoidElement } from './voidElements'

export function handleNormalElement(
  address: number[],
  path: NodePath<t.JSXElement>,
  tag: string
): JSXInfo {
  // jsxInfo for the normal element
  const elementJSXInfo: JSXInfo = {
    // open the opening tag
    html: `<${tag}`,
    expressions: [],
    hydrations: [],
    type: 'element'
  }

  // insert attributes info in jsxInfo
  handleElementAttributes(elementJSXInfo, path, address)

  // close the opening tag
  elementJSXInfo.html += '>'

  // if the element is void element
  // ignore children and no need to add closing tag
  if (isVoidElement(tag)) {
    return elementJSXInfo
  }

  // handle children
  handleElementChildren(elementJSXInfo, path, address)

  // close the tag
  elementJSXInfo.html += `</${tag}>`

  return elementJSXInfo
}
