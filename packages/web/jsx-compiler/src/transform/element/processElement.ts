import * as t from '@babel/types'
import { JSXInfo } from '../../types'
import { NodePath } from '@babel/traverse'
import { isVoidElement } from '../../utils/elements'
import { processAttributes } from './processAttributes'
import { processChildren } from './processChildren'

export function processElement(
  address: number[],
  path: NodePath<t.JSXElement>,
  tag: string
): JSXInfo {
  // jsxInfo for the normal element
  const elementJSXInfo: JSXInfo = {
    // open the opening tag
    html: `<${tag}`,
    hydrations: [],
    type: 'element',
    ssrExprs: [],
    markersAdded: 0
  }

  // insert attributes info in jsxInfo
  processAttributes(elementJSXInfo, path, address)

  // close the opening tag
  elementJSXInfo.html += '>'

  // if the element is void element
  // ignore children and no need to add closing tag
  if (isVoidElement(tag)) {
    return elementJSXInfo
  }

  // handle children
  processChildren(elementJSXInfo, path, address)

  // close the tag
  elementJSXInfo.html += `</${tag}>`

  return elementJSXInfo
}
