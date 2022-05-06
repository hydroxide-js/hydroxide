import { NodePath, types as t } from '@babel/core'
import { ChildPath } from '../component/handleComponentChildren'
import { processJSX } from '../processJSX'
import { JSXInfo } from '../types'
import { handleElementAttributes } from './handleElementAttributes'
import { isVoidElement } from './voidElements'

function isStaticText(jsxInfo: JSXInfo) {
  return jsxInfo.type === 'text' && jsxInfo.expressions.length === 0
}

export function handleNormalElement(
  address: number[],
  path: NodePath<t.JSXElement>,
  tag: string
): JSXInfo {
  const jsxInfo: JSXInfo = {
    html: `<${tag}`,
    expressions: [],
    hydrations: [],
    type: 'element'
  }

  jsxInfo.html += handleElementAttributes(
    path,
    jsxInfo.hydrations,
    address,
    jsxInfo.expressions
  )

  // close the opening tag
  jsxInfo.html += '>'

  // if the element is void element
  // ignore children and no need to add closing tag
  if (isVoidElement(tag)) {
    return jsxInfo
  }

  // handle children
  const children = path.get('children') as ChildPath[]

  let isPrevText = false

  // number of children removed
  let removedSiblings = 0
  // number of text children sitting next to each other - that will be merged into single text
  let mergedSiblings = 0

  const childrenJSXInfo: JSXInfo[] = []

  children.forEach((childPath, i) => {
    // childPath's node could have been removed, so ignore if that's the case
    // what about index??
    if (childPath.node === null) {
      removedSiblings++
      return
    }

    const childAdress = [...address, i - removedSiblings - mergedSiblings]
    const childJSXInfo = processJSX(childPath, childAdress)

    if (childJSXInfo.deleted) {
      removedSiblings++
      return
    }

    const isText = childJSXInfo.expressions.length === 0
    const prevInfo = childrenJSXInfo[childrenJSXInfo.length - 1]

    if (isText) {
      const next = childPath.getNextSibling()

      const noPrevOrPrevIsEl = !prevInfo || prevInfo.type === 'element'
      const noNextOrNextIsEl = !next || t.isJSXElement(next)

      // if both prev and current are static, they will be merged into single thing
      if (isPrevText) {
        mergedSiblings++
      }

      // if no prev or prevInfo is element
      // or if no next or nextInfo is element
      else if (noPrevOrPrevIsEl || noNextOrNextIsEl) {
        // and this text is whitespace only
        const isWhiteSpaceOnly = childJSXInfo.html.trim() === ''
        if (isWhiteSpaceOnly && !childJSXInfo.isExpr) {
          removedSiblings++
          return
        }
      }
    }

    isPrevText = isText
    childrenJSXInfo.push(childJSXInfo)
  })

  // -------------------------------------------------
  // merge text siblings into one which got separated by comments
  let mergedChildrenJSXInfo: JSXInfo[] = []
  if (childrenJSXInfo.length > 1) {
    // push the first
    mergedChildrenJSXInfo.push(childrenJSXInfo[0])

    // then starts loop from second
    for (let i = 1; i < childrenJSXInfo.length; i++) {
      // if both i and i-1 are static text
      if (
        isStaticText(childrenJSXInfo[i]) &&
        isStaticText(childrenJSXInfo[i - 1])
      ) {
        // merge it with previous one
        mergedChildrenJSXInfo[mergedChildrenJSXInfo.length - 1].html +=
          childrenJSXInfo[i].html
      } else {
        // else just push it
        mergedChildrenJSXInfo.push(childrenJSXInfo[i])
      }
    }
  } else {
    mergedChildrenJSXInfo = childrenJSXInfo
  }

  // -------------------------------------------------
  mergedChildrenJSXInfo.forEach((childJSXInfo, i) => {
    // if the child is text
    if (childJSXInfo.type === 'text' && !childJSXInfo.isExpr) {
      const prev = mergedChildrenJSXInfo[i - 1]
      const next = mergedChildrenJSXInfo[i + 1]

      // and previous sibling is element or has no previous sibling
      if (i === 0 || prev.type === 'element') {
        // trim start
        childJSXInfo.html = childJSXInfo.html.trimStart()
      }

      // if the next sibling is element or has no next sibling
      if (i === mergedChildrenJSXInfo.length - 1 || next.type === 'element') {
        // trim end
        childJSXInfo.html = childJSXInfo.html.trimEnd()
      }
    }

    // push child jsxInfo
    jsxInfo.expressions.push(...childJSXInfo.expressions)
    jsxInfo.hydrations.push(...childJSXInfo.hydrations)
    jsxInfo.html += childJSXInfo.html
  })

  // close the tag
  jsxInfo.html += `</${tag}>`

  return jsxInfo
}
