import { NodePath, types as t } from '@babel/core'
import { marker } from '../config'
import { Hydrate } from '../hydration/hydration'
import { ChildPath, JSXInfo, PropList } from '../types'
import { handleComponentChildren } from './handleComponentChildren'
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
): JSXInfo {
  const jsxElement = jsxElementPath.node
  const { attributes } = jsxElement.openingElement

  const data: DataContainer = {
    reservedProps: [],
    props: [],
    children: []
  }

  // add data
  handleComponentProps(jsxElementPath, data, attributes)
  handleComponentChildren(data, jsxElementPath.get('children') as ChildPath[])

  return {
    html: marker,
    expressions: [addCompData(data, compId)],
    hydrations: [Hydrate.$Comp(address)],
    type: 'component'
  }
}

function addCompData(
  data: DataContainer,
  compId: t.Identifier | t.MemberExpression
) {
  const compData: (t.Expression | null)[] = [compId]

  // add props
  if (data.props.length) {
    compData.push(t.objectExpression(data.props))
  } else {
    // add null if next argument needs to be added
    if (data.reservedProps.length || data.children.length) {
      compData.push(null)
    }
  }

  // add reservedProps or null
  if (data.reservedProps.length) {
    compData.push(t.objectExpression(data.reservedProps))
  } else {
    // add null if next argument needs to be added
    if (data.children.length) {
      compData.push(null)
    }
  }

  if (data.children.length) {
    compData.push(t.arrayExpression(data.children))
  }

  return t.arrayExpression(compData)
}
