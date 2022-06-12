import { NodePath, types as t } from '@babel/core'
import { JSXInfo } from '../../types'
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
    type: 'element'
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
