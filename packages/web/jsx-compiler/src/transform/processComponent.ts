import * as t from '@babel/types'
import { NodePath } from '@babel/traverse'
import { marker } from '../config'
import { Attribute, ChildPath, JSXInfo } from '../types'
import { wrapInArrowIfNeeded, wrapInGetterMethod } from '../utils/build'
import { isPathOf, shouldWrap } from '../utils/check'
import { transformJSXPath } from './transformJSX'

export function processComponent(
  address: number[],
  jsxElementPath: NodePath<t.JSXElement>,
  compId: t.Identifier | t.MemberExpression
): JSXInfo {
  const jsxElement = jsxElementPath.node
  const { attributes } = jsxElement.openingElement

  // add data
  const { props, reservedProps } = processComponentProps(jsxElementPath, attributes)

  const childrenExprs = processComponentChildren(
    jsxElementPath.get('children') as ChildPath[]
  )

  if (childrenExprs.length) {
    // if single child
    if (childrenExprs.length === 1 && !t.isSpreadElement(childrenExprs[0])) {
      const expr = childrenExprs[0]

      if (!shouldWrap(expr, true)) {
        // children: expr
        props.push(t.objectProperty(t.identifier('children'), expr))
      } else {
        // get children() { return expr }
        props.push(wrapInGetterMethod('children', expr))
      }
    }

    // more than one children
    else {
      props.push(
        wrapInGetterMethod(
          'children',
          t.arrayExpression(childrenExprs.map((expr) => wrapInArrowIfNeeded(expr)))
        )
      )
    }
  }

  const expressions: t.Expression[] = [compId]

  if (props.length) {
    expressions.push(t.objectExpression(props))
  } else if (reservedProps.length) {
    expressions.push(t.nullLiteral())
  }

  if (reservedProps.length) {
    expressions.push(t.objectExpression(reservedProps))
  }

  return {
    html: marker,
    hydrations: [
      {
        type: 'Comp',
        data: expressions,
        address
      }
    ],
    type: 'component'
  }
}

export function processComponentProps(
  jsxElementPath: NodePath<t.JSXElement>,
  attributes: Attribute[]
) {
  const props: (t.ObjectProperty | t.ObjectMethod)[] = []
  const reservedProps: t.ObjectProperty[] = []

  // props
  function addProp(name: string, value: t.Expression | t.Literal) {
    // propName: propValue
    if (!shouldWrap(value)) {
      const objectProperty = t.objectProperty(t.identifier(name), value)
      props.push(objectProperty)
    } else {
      const objectMethod = wrapInGetterMethod(name, value)
      props.push(objectMethod)
    }
  }

  for (const attribute of attributes) {
    // spread attribute
    if (t.isJSXSpreadAttribute(attribute)) {
      throw jsxElementPath.buildCodeFrameError('Spread props are not allowed')
    }

    // normal attribute
    else {
      // reserved attributes
      if (t.isJSXNamespacedName(attribute.name)) {
        if (
          attribute.name.namespace.name === '$' &&
          t.isJSXExpressionContainer(attribute.value)
        ) {
          const expr = attribute.value.expression

          // empty jsx expression
          if (t.isJSXEmptyExpression(expr)) {
            throw jsxElementPath.buildCodeFrameError(
              'attributes can not have empty value'
            )
          }

          const attrNamespace = attribute.name

          const propExpr = t.objectProperty(
            t.stringLiteral(`${attrNamespace.namespace.name}:${attrNamespace.name.name}`),
            wrapInArrowIfNeeded(expr)
          )

          reservedProps.push(propExpr)
        }
      }

      // if no value, set to true
      else if (!attribute.value) {
        addProp(attribute.name.name, t.booleanLiteral(true))
      }

      // propName: {propValue}
      else if (t.isJSXExpressionContainer(attribute.value)) {
        // propName: {}
        // ignore: JSX attributes must only be assigned a non-empty expression
        if (t.isJSXEmptyExpression(attribute.value.expression)) continue

        if (t.isJSXElement(attribute.value.expression)) {
          // TODO:
          // jsx given as propValue
          addProp(attribute.name.name, attribute.value.expression)
        } else {
          addProp(attribute.name.name, attribute.value.expression)
        }
      } else if (t.isJSXElement(attribute.value)) {
        // ignore - should never happen
        // if you want to give jsx as prop - wrap with a expression container
      } else {
        addProp(attribute.name.name, attribute.value)
      }
    }
  }

  return {
    props: props,
    reservedProps: reservedProps
  }
}

export function processComponentChildren(childPaths: ChildPath[]) {
  const childrenExprs: (t.Expression | t.Literal | t.SpreadElement)[] = []

  childPaths.forEach((childPath) => {
    // JSXElement
    if (isPathOf.JSXElement(childPath)) {
      childrenExprs.push(transformJSXPath(childPath))
    }

    // JSXExpressionContainer
    else if (isPathOf.JSXExpressionContainer(childPath)) {
      const expr = childPath.node.expression
      if (t.isJSXEmptyExpression(expr)) return
      childrenExprs.push(expr)
    }

    // JSXText
    else if (isPathOf.JSXText(childPath)) {
      // replace multiple consecutive whitespace with single space
      // and trim start and end
      const text = childPath.node.value.trim()

      // ignore empty text
      if (text === '') {
        return
      }
      childrenExprs.push(t.stringLiteral(text))
    }

    // JSXSpreadChild
    else if (isPathOf.JSXSpreadChild(childPath)) {
      const spreadExpr = t.spreadElement(childPath.node.expression)
      childrenExprs.push(spreadExpr)
    }
  })

  return childrenExprs
}
