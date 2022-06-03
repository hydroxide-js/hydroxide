import { NodePath, types as t } from '@babel/core'
import { marker } from '../../config'
import { ChildPath, JSXInfo } from '../../types'
import { wrapInArrow } from '../../utils/wrapInArrow'
import { createGetterMethod } from '../../utils/wrapInGetter'
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
    if (childrenExprs.length === 1 && !t.isSpreadElement(childrenExprs[0])) {
      const expr = childrenExprs[0]

      // if identifier, no need to wrap in a getter
      if (t.isIdentifier(expr) || t.isLiteral(expr)) {
        props.push(t.objectProperty(t.identifier('children'), expr))
      } else {
        props.push(createGetterMethod('children', expr))
      }
    } else {
      const wrappedChildrenExprs = childrenExprs.map((expr) => {
        if (t.isLiteral(expr)) return expr
        return wrapInArrow(expr as t.Expression)
      })

      props.push(
        createGetterMethod('children', t.arrayExpression(wrappedChildrenExprs))
      )
    }
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
