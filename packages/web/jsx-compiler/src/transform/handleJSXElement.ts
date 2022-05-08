import { NodePath, types as t } from '@babel/core'
import { handleComponent } from '../component/handleComponent'
import { handleElement } from '../element/handleElement'
import { handleBranch } from '../utils/handleBranch'
import { JSXMemberExpToMemberExp } from '../utils/memberExpr'

export function handleJSXElement(
  elementPath: NodePath<t.JSXElement>,
  address: number[]
) {
  const openingElementName = elementPath.node.openingElement.name

  // branch ( $:if $:else-if $:else )
  const branchOutput = handleBranch(address, elementPath)
  if (branchOutput) return branchOutput

  // <foo:bar />
  if (t.isJSXNamespacedName(openingElementName)) {
    const namespace = openingElementName.namespace.name
    const namespaceName = openingElementName.name.name
    const tag = namespace + ':' + namespaceName
    return handleElement(address, elementPath, tag)
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
      return handleElement(address, elementPath, tag)
    }
  }
}
