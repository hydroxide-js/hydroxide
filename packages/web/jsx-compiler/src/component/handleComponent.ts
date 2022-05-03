import { NodePath, types as t } from '@babel/core'
import { compHydration } from '../hydration/hydration'
import { marker } from '../marker'
import { Output, PropList } from '../types'
import { ChildPath, handleComponentChildren } from './handleComponentChildren'
import { handleComponentProps } from './handleComponentProps'

export type DataContainer = {
  reservedProps: PropList
  props: PropList
  children: (t.Expression | t.StringLiteral | t.SpreadElement)[]
}

export function handleComponent(
  address: number[],
  jsxElementPath: NodePath<t.JSXElement>,
  compId: t.Identifier | t.MemberExpression
): Output {
  const jsxElement = jsxElementPath.node
  const { attributes } = jsxElement.openingElement

  const data: DataContainer = {
    reservedProps: [],
    props: [],
    children: []
  }

  // add data
  handleComponentProps(data, attributes)
  handleComponentChildren(data, jsxElementPath.get('children') as ChildPath[])

  return [marker, [addCompData(data, compId)], [compHydration(address)]]
}

function addCompData(
  data: DataContainer,
  compId: t.Identifier | t.MemberExpression
) {
  const compData: t.Expression[] = [compId]

  // add props
  if (data.props.length) {
    compData.push(t.objectExpression(data.props))
  } else {
    // add null if next argument needs to be added
    if (data.reservedProps.length || data.children.length) {
      compData.push(t.nullLiteral())
    }
  }

  // add reservedProps or null
  if (data.reservedProps.length) {
    compData.push(t.objectExpression(data.reservedProps))
  } else {
    // add null if next argument needs to be added
    if (data.children.length) {
      compData.push(t.nullLiteral())
    }
  }

  if (data.children.length) {
    compData.push(t.arrayExpression(data.children))
  }

  return t.arrayExpression(compData)
}
