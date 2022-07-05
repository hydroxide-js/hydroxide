import { NodePath, traverse, types as t } from '@babel/core'
import { programInfo } from '../programInfo'
import { SLiteral } from '../types'

export function isSLiteral(expr: any): expr is SLiteral {
  if (t.isLiteral(expr)) {
    if (t.isRegExpLiteral(expr) || t.isNullLiteral(expr)) return false
    if (t.isTemplateLiteral(expr)) {
      return expr.expressions.length === 0
    }
    return true
  }
  return false
}

/** return true if given expression is undefined identifier */
export function isUndef(expression: any): expression is t.Identifier {
  return t.isIdentifier(expression, { name: 'undefined' })
}

/** return true if given path is of JSXText */
function isJSXElementPath(path: NodePath<any>): path is NodePath<t.JSXElement> {
  return t.isJSXElement(path.node)
}

function isJSXTextPath(path: NodePath<any>): path is NodePath<t.JSXText> {
  return t.isJSXText(path.node)
}

function isJSXAttributePath(path: NodePath<any>): path is NodePath<t.JSXAttribute> {
  return t.isJSXAttribute(path.node)
}

function isJSXExpressionContainerPath(
  path: NodePath<any>
): path is NodePath<t.JSXExpressionContainer> {
  return t.isJSXExpressionContainer(path.node)
}

function isJSXSpreadChildPath(path: NodePath<any>): path is NodePath<t.JSXSpreadChild> {
  return t.isJSXSpreadChild(path.node)
}

function isJSXFragmentPath(path: NodePath<any>): path is NodePath<t.JSXFragment> {
  return t.isJSXFragment(path.node)
}

export const isPathOf = {
  JSXElement: isJSXElementPath,
  JSXText: isJSXTextPath,
  JSXAttribute: isJSXAttributePath,
  JSXExpressionContainer: isJSXExpressionContainerPath,
  JSXSpreadChild: isJSXSpreadChildPath,
  JSXFragment: isJSXFragmentPath
}

type $Attribute = 'if' | 'else-if' | 'else'

/**
 * given attributes and string "x",
 * it returns true if given attributes array contains the $:x attribute
 */
export function has$Attr(
  attributes: (t.JSXAttribute | t.JSXSpreadAttribute)[],
  attrName: $Attribute
) {
  const index = attributes.findIndex((attribute) => {
    if (t.isJSXAttribute(attribute)) {
      if (t.isJSXNamespacedName(attribute.name)) {
        const { namespace, name } = attribute.name
        return namespace.name === '$' && name.name === attrName
      }

      return false
    }

    return false
  })

  return index !== -1 ? (attributes[index] as t.JSXAttribute) : undefined
}

// check if the expression is component(...) or branch(...)
export function isCompOrBranchCall(expr: any) {
  if (!t.isCallExpression(expr)) return false
  const callee = expr.callee
  return (
    t.isIdentifier(callee) && (callee.name === 'component' || callee.name === 'branch')
  )
}

// check if the expression is xxx.cloneNode()
export function isTemplateClone(expr: any) {
  if (!t.isCallExpression(expr)) return false
  const callee = expr.callee
  if (!t.isMemberExpression(callee)) return false
  const property = callee.property
  return t.isIdentifier(property) && property.name === 'cloneNode'
}

function isIIFE(expr: any) {
  return t.isCallExpression(expr) && t.isArrowFunctionExpression(expr.callee)
}

export function shouldWrap(
  expr: t.Expression | t.Identifier | t.SpreadElement,
  inChildren = false
) {
  if (!inChildren) {
    // don't wrap template clone
    if (isTemplateClone(expr) || isCompOrBranchCall(expr) || isIIFE(expr)) {
      return false
    }
  }

  // wrap foo() and foo.bar
  if (t.isCallExpression(expr) || t.isMemberExpression(expr)) return true

  if (t.isSpreadElement(expr) || t.isArrowFunctionExpression(expr)) {
    return false
  }

  let shouldWrap = false

  traverse(
    expr,
    {
      CallExpression(path) {
        shouldWrap = true
        path.stop()
      },
      MemberExpression(path) {
        shouldWrap = true
        path.stop()
      }
    },
    programInfo.path.scope
  )

  return shouldWrap
}
