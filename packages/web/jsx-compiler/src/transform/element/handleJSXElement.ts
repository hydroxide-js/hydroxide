import { NodePath, types as t } from '@babel/core'
import { JSXInfo } from '../../types'
import { has$Attr } from '../../utils/hasIf'
import { JSXMemberExpToMemberExp } from '../../utils/memberExpr'
import { handleComponent } from '../component/handleComponent'
import { handleBranch } from '../handleBranch'
import { handleNormalElement } from './handleNormalElement'

export function handleJSXElement(
  elementPath: NodePath<t.JSXElement>,
  address: number[]
): JSXInfo {
  const openingElementName = elementPath.node.openingElement.name

  // branching logic
  if (has$Attr(elementPath.node.openingElement.attributes, 'if')) {
    return handleBranch(address, elementPath)
  }

  // <foo:bar />
  if (t.isJSXNamespacedName(openingElementName)) {
    const namespace = openingElementName.namespace.name
    const namespaceName = openingElementName.name.name
    const tag = namespace + ':' + namespaceName
    return handleNormalElement(address, elementPath, tag)
  }

  // <Foo.bar />
  else if (t.isJSXMemberExpression(openingElementName)) {
    const memberExpr = JSXMemberExpToMemberExp(elementPath)
    return handleComponent(address, elementPath, memberExpr)
  }

  // <Foo /> or <bar />
  else {
    const tag = openingElementName.name

    // <Foo />
    if (tag[0].toUpperCase() === tag[0]) {
      return handleComponent(address, elementPath, t.identifier(tag))
    }

    // <bar />
    else {
      return handleNormalElement(address, elementPath, tag)
    }
  }
}
