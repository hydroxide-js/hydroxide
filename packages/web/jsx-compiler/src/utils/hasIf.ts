import { types as t } from '@babel/core'

export function hasIf(attributes: (t.JSXAttribute | t.JSXSpreadAttribute)[]) {
  return has$Attr(attributes, 'if')
}

export function hasElseIf(
  attributes: (t.JSXAttribute | t.JSXSpreadAttribute)[]
) {
  return has$Attr(attributes, 'else-if')
}

export function hasElse(attributes: (t.JSXAttribute | t.JSXSpreadAttribute)[]) {
  return has$Attr(attributes, 'else')
}

export function has$Attr(
  attributes: (t.JSXAttribute | t.JSXSpreadAttribute)[],
  attrName: string
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
