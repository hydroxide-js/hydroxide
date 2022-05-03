import { NodePath, types as t } from '@babel/core'

function isJSXElementPath(path: NodePath<any>): path is NodePath<t.JSXElement> {
  return t.isJSXElement(path.node)
}

function isJSXTextPath(path: NodePath<any>): path is NodePath<t.JSXText> {
  return t.isJSXText(path.node)
}

function isJSXAttributePath(
  path: NodePath<any>
): path is NodePath<t.JSXAttribute> {
  return t.isJSXAttribute(path.node)
}

function isJSXExpressionContainerPath(
  path: NodePath<any>
): path is NodePath<t.JSXExpressionContainer> {
  return t.isJSXExpressionContainer(path.node)
}

function isJSXSpreadChildPath(
  path: NodePath<any>
): path is NodePath<t.JSXSpreadChild> {
  return t.isJSXSpreadChild(path.node)
}

function isJSXFragmentPath(
  path: NodePath<any>
): path is NodePath<t.JSXFragment> {
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
