import { NodePath, types as t } from '@babel/core'
import { JSXInfo } from '../types'
import { convertJSXMembertoMemberExpr } from '../utils/build'
import { has$Attr } from '../utils/check'
import { processElement } from './element/processElement'
import { processBranch } from './processBranch'
import { processComponent } from './processComponent'

export function processJSXElement(
  elementPath: NodePath<t.JSXElement>,
  address: number[]
): JSXInfo {
  const openingElementName = elementPath.node.openingElement.name

  // branch
  if (has$Attr(elementPath.node.openingElement.attributes, 'if')) {
    return processBranch(address, elementPath)
  }

  // <foo:bar />
  if (t.isJSXNamespacedName(openingElementName)) {
    const namespace = openingElementName.namespace.name
    const namespaceName = openingElementName.name.name
    const tag = namespace + ':' + namespaceName
    return processElement(address, elementPath, tag)
  }

  // <Foo.bar />
  else if (t.isJSXMemberExpression(openingElementName)) {
    const memberExpr = convertJSXMembertoMemberExpr(elementPath)
    return processComponent(address, elementPath, memberExpr)
  }

  // <Foo /> or <bar />
  else {
    const tag = openingElementName.name

    // <Foo />
    if (tag[0].toUpperCase() === tag[0]) {
      return processComponent(address, elementPath, t.identifier(tag))
    }

    // <bar />
    else {
      return processElement(address, elementPath, tag)
    }
  }
}
