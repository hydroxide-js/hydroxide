import { types as t } from '@babel/core'
import { handleComponent } from './component/handleComponent'
import { handleBranch } from './element/handleBranch'
import { handleElement } from './element/handleElement'
import { jsxFragmentError, jsxSpreadChildError } from './errors'
import { textHydration } from './hydration/hydration'
import { marker } from './marker'
import { JSXInfo, JSXNodePath } from './types'
import { handleExpressionContainer } from './utils/handleExpression'
import { isPathOf } from './utils/isPath'
import { JSXMemberExpToMemberExp } from './utils/memberExpr'
import { valueOfSLiteral } from './utils/SLiteral'

/**
 * process the jsx node at given node address and return the JSXInfo
 */
export function processJSX(path: JSXNodePath, address: number[]): JSXInfo {
  // JSXText
  if (isPathOf.JSXText(path)) {
    // replace more than one whitespace with one whitespace
    return {
      html: path.node.value,
      expressions: [],
      hydrations: [],
      type: 'text'
    }
  }

  // JSXElement
  else if (isPathOf.JSXElement(path)) {
    const openingElementName = path.node.openingElement.name

    // branch ( $:if $:else-if $:else )
    const branchOutput = handleBranch(address, path)
    if (branchOutput) return branchOutput

    // <foo:bar />
    if (t.isJSXNamespacedName(openingElementName)) {
      const namespace = openingElementName.namespace.name
      const namespaceName = openingElementName.name.name
      const tag = namespace + ':' + namespaceName
      return handleElement(address, path, tag)
    }

    // <Foo.bar />
    else if (t.isJSXMemberExpression(openingElementName)) {
      const memberExpr = JSXMemberExpToMemberExp(path)
      return handleComponent(address, path, memberExpr)
    }

    // <Foo /> or <bar />
    else {
      const tag = openingElementName.name

      // <Foo />
      if (tag[0].toUpperCase() === tag[0]) {
        return handleComponent(address, path, t.identifier(tag))
      }

      // <bar />
      else {
        return handleElement(address, path, tag)
      }
    }
  }

  // JSXExpressionContainer
  else if (isPathOf.JSXExpressionContainer(path)) {
    const jsxInfo: JSXInfo = {
      html: '',
      expressions: [],
      hydrations: [],
      type: 'text',
      isExpr: true
    }

    handleExpressionContainer(path.node, {
      Empty() {
        jsxInfo.deleted = true
        // ignore
      },
      null() {
        jsxInfo.deleted = true
        // ignore
      },
      undefined() {
        jsxInfo.deleted = true
        // ignore
      },
      SLiteral(expr) {
        jsxInfo.html = valueOfSLiteral(expr) + ''
      },
      Expr(expr) {
        jsxInfo.html = marker
        jsxInfo.expressions = [expr]
        jsxInfo.hydrations = [textHydration(address)]
      }
    })

    return jsxInfo
  }

  // JSXFragment - Error
  else if (isPathOf.JSXFragment(path)) {
    throw jsxFragmentError(path)
  }

  // JSXSpreadChildPath - Error
  else if (isPathOf.JSXSpreadChild(path)) {
    throw jsxSpreadChildError(path)
  }

  // never - Error
  else {
    // @ts-expect-error
    throw path.buildCodeFrameError('Unknown JSX Node')
  }
}
