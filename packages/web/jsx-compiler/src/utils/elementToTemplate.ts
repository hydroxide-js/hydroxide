import { NodePath, types as t, types } from '@babel/core'
import {
  attributeHydration,
  branchHydration,
  componentHydration,
  insertHydration
} from '../hydration'
import { transform } from '../transform/transform'
import { Hydration } from '../types'
import { registerTemplate } from './registerTemplate'

/**
 * convert the jsxElement to template callexpression
 * <> ... </> => _T(...)
 */
export function elementToTemplate(path: NodePath<types.JSXElement>) {
  const { html, hydrations } = transform(path, [])
  return createHydrator(html, hydrations)
}

export function createHydrator(html: string, hydrations: Hydration[]) {
  const templateId = registerTemplate(html)

  if (hydrations.length === 0) {
    return t.callExpression(templateId, [])
  }

  // eslint-disable-next-line array-callback-return
  const statements = hydrations.map((hydration) => {
    switch (hydration.type) {
      case 'Attr': {
        return attributeHydration(hydration.address, hydration.data)
      }
      case 'Branch': {
        return branchHydration(hydration.address, hydration.data)
      }
      case 'Comp': {
        return componentHydration(hydration.address, hydration.data)
      }
      case 'Insert': {
        return insertHydration(hydration.address, hydration.data)
      }
    }
  })

  const arg = t.arrowFunctionExpression([], t.blockStatement(statements))

  return t.callExpression(templateId, [arg])
}
