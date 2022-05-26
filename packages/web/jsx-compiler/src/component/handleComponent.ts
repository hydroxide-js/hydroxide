import { NodePath, types as t } from '@babel/core'
import { marker } from '../config'
import { Hydrate } from '../hydration/hydration'
import { ChildPath, JSXInfo } from '../types'
import { handleComponentChildren } from './handleComponentChildren'
import { handleComponentProps } from './handleComponentProps'

export function handleComponent(
  address: number[],
  jsxElementPath: NodePath<t.JSXElement>,
  compId: t.Identifier | t.MemberExpression
): JSXInfo {
  const jsxElement = jsxElementPath.node
  const { attributes } = jsxElement.openingElement

  // add data
  const { props, reservedProps } = handleComponentProps(
    jsxElementPath,
    attributes
  )

  const childrenExprs = handleComponentChildren(
    jsxElementPath.get('children') as ChildPath[]
  )

  if (childrenExprs.length) {
    // props.children = []
    props.push(
      t.objectProperty(
        t.identifier('children'),
        t.arrayExpression(childrenExprs)
      )
    )
  }

  const expressions: (null | t.Expression)[] = [compId]

  if (props.length) {
    expressions.push(t.objectExpression(props))
  } else {
    if (reservedProps.length) {
      expressions.push(null)
    }
  }

  if (reservedProps.length) {
    expressions.push(t.objectExpression(reservedProps))
  }

  return {
    html: marker,
    expressions: [t.arrayExpression(expressions)],
    hydrations: [Hydrate.$Comp(address)],
    type: 'component'
  }
}
