import type { NodePath, Visitor } from '@babel/core'
import { types as t } from '@babel/core'
import { jsxFragmentError, jsxSpreadChildError } from '../errors'
import { isPathOf } from '../utils/isPath'
import { isUndef } from '../utils/isUndef'
import { isSLiteral, valueOfSLiteral } from '../utils/stringifyLiteral'

type Attr = t.JSXAttribute | t.JSXSpreadAttribute

export const optimizeJSXExpressionContainer: Visitor<{}> = {
  JSXExpressionContainer(path) {
    // {} or {/* */}
    if (t.isJSXEmptyExpression(path.node.expression)) {
      path.remove()
    } else {
      const expr = path.node.expression

      if (isPathOf.JSXAttribute(path.parentPath)) {
        if (isCompProp(path.parentPath)) return

        const hasSpread = (path.parentPath.container as Attr[]).some((atNode) =>
          t.isJSXSpreadAttribute(atNode)
        )

        if (hasSpread) return

        // attributes on element
        if (t.isNullLiteral(expr) || isUndef(expr)) {
          path.parentPath.node.value = t.stringLiteral('')
        }

        // string, number, boolean
        if (isSLiteral(expr)) {
          const str = valueOfSLiteral(expr) + ''
          path.parentPath.node.value = t.stringLiteral(str)
        }

        if (t.isLiteral(expr)) {
          // template literal without expressions
          if (t.isTemplateLiteral(expr)) {
            if (expr.expressions.length === 0) {
              const rawStr = expr.quasis[0].value.raw
              path.parentPath.node.value = t.stringLiteral(rawStr)
            }
          }
        }
      }

      // jsxText
      else {
        // null or undefined
        if (t.isNullLiteral(expr) || isUndef(expr)) {
          path.remove()
        }

        // string, number, boolean
        if (isSLiteral(expr)) {
          const str = '' + valueOfSLiteral(expr)
          path.replaceWith(t.jsxText(str))
        }

        // template literal without expressions
        if (t.isTemplateLiteral(expr)) {
          if (expr.expressions.length === 0) {
            const rawStr = expr.quasis[0].value.raw
            path.replaceWith(t.jsxText(rawStr))
          }
        }
      }
    }
  },
  JSXFragment(path) {
    throw jsxFragmentError(path)
  },

  JSXSpreadChild(path) {
    throw jsxSpreadChildError(path)
  }
}

function isCompProp(path: NodePath<t.JSXAttribute | t.JSXSpreadAttribute>) {
  // @ts-ignore
  const node = path.parentPath.parentPath.node as t.JSXElement

  const tagName = node.openingElement.name
  const isComp =
    t.isJSXMemberExpression(tagName) ||
    (typeof tagName.name === 'string' &&
      tagName.name[0] === tagName.name[0].toUpperCase())

  return isComp
}
