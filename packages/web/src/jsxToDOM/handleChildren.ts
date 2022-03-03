import { Reactive } from '@nuejs/core'
import { DynamicParts } from '../types/DynamicPart'
import { isObject } from '../utils/isObject'
import { NodeAddress } from '../utils/queryDOM'
import { jsxHtmlElementToHTML } from './jsxHtmlElementToHTML'
import { primitivesToHTML } from './primitivesToHTML'
import { reactiveToHTML } from './reactiveToHTML'

export function handleChildren(
  children: JSX.Element[],
  markup: string[],
  dynamicParts: DynamicParts,
  domAddress: NodeAddress,
  jsxAddress: NodeAddress
) {
  let isPrevStaticText = true

  // consecutive static text nodes are merged, so need to subtract this from the index
  let mergeCount = 0

  // each dynamic is added with two comments and X inside it
  // so we need to add this to index
  let extraNodesAdded = 0

  children.forEach((child: JSX.Element, i) => {
    // static text nodes
    if (!isObject(child)) {
      markup.push(primitivesToHTML(child))
      if (i > 0 && isPrevStaticText) mergeCount++
      isPrevStaticText = true
    }

    // reactive or element
    else {
      isPrevStaticText = false
      const textNodeIndex = i + extraNodesAdded - mergeCount
      const _jsxAddress = [...jsxAddress, i]

      if (child instanceof Reactive) {
        extraNodesAdded += 2
        markup.push(
          reactiveToHTML(
            dynamicParts,
            [...domAddress, textNodeIndex + 1], // +1 to target textNode between comment nodes
            _jsxAddress
          )
        )
      } else {
        markup.push(
          jsxHtmlElementToHTML(
            child,
            dynamicParts,
            [...domAddress, textNodeIndex], // +1 to target textNode
            _jsxAddress
          )
        )
      }
    }
  })
}
