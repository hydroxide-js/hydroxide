import { types as t } from '@babel/core'

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
