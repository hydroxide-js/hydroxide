import { NodePath, types as t } from '@babel/core'
import { processJSX } from '../transform/processJSX'
import { ChildPath, JSXInfo } from '../types'

/**
 * processes element's children and
 * creates an optimized html markup for it
 */
export function handleElementChildren(
  elementJSXInfo: JSXInfo,
  elementPath: NodePath<t.JSXElement>,
  elementAddress: number[]
) {
  let childPaths = elementPath.get('children') as ChildPath[]
  if (childPaths.length === 0) return

  // number of children removed
  let removed = 0

  const childrenJSXInfo: JSXInfo[] = []

  // phase 0 - remove comments
  for (let i = 0; i < childPaths.length; i++) {
    const childPath = childPaths[i]
    if (
      t.isJSXExpressionContainer(childPath.node) &&
      t.isJSXEmptyExpression(childPath.node.expression)
    ) {
      childPath.remove()
    }
  }

  // refresh children
  childPaths = elementPath.get('children') as ChildPath[]

  // phase 1 - keep hydration index accurate
  // ignore removed nodes
  // remove whitespaces from start
  // merge adjacent text nodes
  for (let i = 0; i < childPaths.length; i++) {
    const childPath = childPaths[i]

    // if the node is removed
    if (childPath.node === null) {
      removed++
      continue
    }

    const realIndex = i - removed
    const childAddress = [...elementAddress, realIndex]
    const childJSXInfo = processJSX(childPath, childAddress)

    // if the node should be ignored
    if (childJSXInfo.type === 'ignore') {
      removed++
      continue
    }

    if (
      childJSXInfo.type === 'text' ||
      childJSXInfo.type === 'text_from_expr'
    ) {
      // remove extra spaces

      // prev
      const prevInfo = childrenJSXInfo[childrenJSXInfo.length - 1]
      const isPrevEl = prevInfo && prevInfo.type === 'element'

      const isWhiteSpaceOnly = childJSXInfo.html.trim() === ''
      const isPrevTextType =
        prevInfo &&
        (prevInfo.type === 'text' || prevInfo.type === 'text_from_expr')

      const nextElPath = childPath.getNextSibling()
      const isNextEl = t.isJSXElement(nextElPath.node)
      const noNextElement = nextElPath.node === null

      // trimming and removal of text is only for the text type
      if (childJSXInfo.type === 'text') {
        childJSXInfo.html = childJSXInfo.html.replace(/\s+/g, ' ')

        // remove whitespace
        // - if it's before or after an element
        // - it it's the first child
        // (last child case is handled in the next phase) see 🔼
        if (isWhiteSpaceOnly) {
          if (realIndex === 0 || isNextEl || isPrevEl) {
            removed++
            continue
          }
        }

        // trim start
        // - if there is element before it
        // - if it's the first child
        if (realIndex === 0 || isPrevEl) {
          childJSXInfo.html = childJSXInfo.html.trimStart()
        }

        // trim end
        // - if there is element after it
        // - if it's the last child
        // ( this is incomplete because even if it's not last child now, it could be (see 🔼 where this is handled) )
        if (isNextEl || noNextElement) {
          childJSXInfo.html = childJSXInfo.html.trimEnd()
        }
      }

      // merge text if previous is static text
      if (isPrevTextType) {
        removed++

        // avoid double spaces where two text types are merged
        // by trimming the middle section
        if (prevInfo.type === 'text' && childJSXInfo.type === 'text') {
          if (
            childJSXInfo.html.startsWith(' ') &&
            prevInfo.html.endsWith(' ')
          ) {
            prevInfo.html = prevInfo.html.trimEnd()
          }
        }
      }
    }

    childrenJSXInfo.push(childJSXInfo)
  }

  //  🔼 start from end and keep trimming the end
  let i = childrenJSXInfo.length - 1
  while (i >= 0) {
    const target = childrenJSXInfo[i]
    if (target.type === 'text' && target.html.endsWith(' ')) {
      target.html = target.html.trimEnd()
    } else {
      break
    }
    i--
  }

  childrenJSXInfo.forEach((childJSXInfo) => {
    elementJSXInfo.expressions.push(...childJSXInfo.expressions)
    elementJSXInfo.hydrations.push(...childJSXInfo.hydrations)
    elementJSXInfo.html += childJSXInfo.html
  })
}
