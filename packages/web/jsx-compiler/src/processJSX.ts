import { types as t } from '@babel/core'
import { handleComponent } from './component/handleComponent'
import { handleBranch } from './element/handleBranch'
import { handleElement } from './element/handleElement'
import { jsxFragmentError, jsxSpreadChildError } from './errors'
import { textHydration } from './hydration/hydration'
import { marker } from './marker'
import { JSXNodePath, Output } from './types'
import { handleExpressionContainer } from './utils/handleExpression'
import { isPathOf } from './utils/isPath'
import { JSXMemberExpToMemberExp } from './utils/memberExpr'

export function processJSX(path: JSXNodePath, address: number[]): Output {
  // JSXText
  if (isPathOf.JSXText(path)) {
    const html = path.node.value
    return [html, [], []]
  }

  // JSXElement
  else if (isPathOf.JSXElement(path)) {
    const openingElementName = path.node.openingElement.name

    // branch
    const branchOutput = handleBranch(address, path)
    if (branchOutput) return branchOutput

    // foo:bar
    if (t.isJSXNamespacedName(openingElementName)) {
      const namespace = openingElementName.namespace.name
      const namespaceName = openingElementName.name.name
      const tag = namespace + ':' + namespaceName
      return handleElement(address, path, tag)
    }

    // Foo.bar
    else if (t.isJSXMemberExpression(openingElementName)) {
      const memberExpr = JSXMemberExpToMemberExp(path)
      return handleComponent(address, path, memberExpr)
    }

    // Foo | bar
    else {
      const tag = openingElementName.name

      // Foo
      if (tag[0].toUpperCase() === tag[0]) {
        // Component
        return handleComponent(address, path, t.identifier(tag))
      }

      // bar
      else {
        // Element
        return handleElement(address, path, tag)
      }
    }
  }

  // JSXExpressionContainer
  else if (isPathOf.JSXExpressionContainer(path)) {
    let output: Output = ['', [], []]
    handleExpressionContainer(path, {
      Empty() {
        // ignore
      },
      null() {
        // ignore
      },
      undefined() {
        // ignore
      },
      SLiteral(value) {
        output = [value + '', [], []]
      },
      Expr(expr) {
        output = [marker, [expr], [textHydration(address)]]
      }
    })

    return output
  }

  // JSXFragment
  else if (isPathOf.JSXFragment(path)) {
    throw jsxFragmentError(path)
  }

  // JSXSpreadChildPath
  else if (isPathOf.JSXSpreadChild(path)) {
    throw jsxSpreadChildError(path)
  }

  // never
  else {
    // @ts-expect-error
    throw path.buildCodeFrameError('Unknown JSX Node')
  }
}
