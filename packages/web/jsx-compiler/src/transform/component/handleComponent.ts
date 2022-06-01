import { NodePath, types as t } from '@babel/core'
import { marker } from '../../config'
import { ChildPath, JSXInfo } from '../../types'
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
    // props.children = singleValue or value[]
    props.push(
      t.objectProperty(
        t.identifier('children'),
        childrenExprs.length === 1 && !t.isSpreadElement(childrenExprs[0])
          ? childrenExprs[0]
          : t.arrayExpression(childrenExprs)
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
    hydrations: [
      {
        type: 'Comp',
        data: t.arrayExpression(expressions),
        address
      }
    ],
    type: 'component'
  }
}
