import { NodePath, types as t } from '@babel/core'
import { Output } from '../types'
import { has$Attr } from '../utils/hasIf'
import { handleConditionalElement } from './handleConditionalElement'
import { handleNormalElement } from './handleNormalElement'

export function handleElement(
  address: number[],
  path: NodePath<t.JSXElement>,
  tag: string
): Output {
  const ifAttribute = has$Attr(path.node.openingElement.attributes, 'if')

  if (ifAttribute) {
    return handleConditionalElement(address, path, ifAttribute)
  }

  // normal
  else {
    return handleNormalElement(address, path, tag)
  }
}
