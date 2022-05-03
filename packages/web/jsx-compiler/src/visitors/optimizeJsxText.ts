import type { Visitor } from '@babel/core'
import { NodePath, types as t } from '@babel/core'

// replace consequtive whitespace with a single space
function removeExtraSpaces(path: NodePath<t.JSXText>) {
  path.node.value = path.node.value.replace(/\s+/g, ' ')
}

function trimStart(path: NodePath<t.JSXText>) {
  path.node.value = path.node.value.trimStart()
}

function trimEnd(path: NodePath<t.JSXText>) {
  path.node.value = path.node.value.trimEnd()
}

function startsWithWhitespace(str: string) {
  return str.length !== 0 && str[0].match(/\s/)
}

function endsWithWhitespace(str: string) {
  return str.length !== 0 && str[str.length - 1].match(/\s/)
}

export const optimizeJsxText: Visitor<{}> = {
  JSXText(path) {
    // remove extra spaces for all
    removeExtraSpaces(path)

    const prevNode = path.getPrevSibling().node
    const nextNode = path.getNextSibling().node

    if (!prevNode) {
      trimStart(path)
    }

    if (!nextNode) {
      trimEnd(path)
    }

    const text = path.node.value

    const hasSpaceOnLeft = startsWithWhitespace(text)
    const hasSpaceOnRight = endsWithWhitespace(text)

    if (text === '') {
      path.remove()
      return
    }

    function trim() {
      if (hasSpaceOnLeft) {
        const shouldTrimLeft =
          !prevNode ||
          (t.isJSXText(prevNode) && endsWithWhitespace(prevNode.value)) ||
          t.isJSXElement(prevNode)

        if (shouldTrimLeft) trimStart(path)
      }

      if (hasSpaceOnRight) {
        const shouldTrimRight =
          !nextNode ||
          (t.isJSXText(nextNode) && startsWithWhitespace(nextNode.value)) ||
          t.isJSXElement(nextNode)

        if (shouldTrimRight) trimEnd(path)
      }
    }

    // if JSXText only contains whitespace
    if (path.node.value.trim() === '') {
      const notSurroundedByJSXText =
        t.isJSXElement(prevNode) || t.isJSXElement(nextNode)
      const atCorner = !prevNode || !nextNode

      if (notSurroundedByJSXText || atCorner) {
        path.remove()
      } else {
        trim()
      }
    }

    // else
    else {
      trim()
    }
  }
}
