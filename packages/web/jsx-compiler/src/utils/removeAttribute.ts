import { types as t } from '@babel/core'

export function removeAttribute(
  attributes: (t.JSXAttribute | t.JSXSpreadAttribute)[],
  attr: t.JSXAttribute
) {
  const index = attributes.findIndex((at) => at === attr)
  attributes.splice(index, 1)
}

export function removeAttributeFromElement(
  element: t.JSXElement,
  attr: t.JSXAttribute
) {
  const index = element.openingElement.attributes.findIndex((at) => at === attr)
  element.openingElement.attributes.splice(index, 1)
}
