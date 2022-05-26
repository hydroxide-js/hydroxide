import { NodePath, types as t } from '@babel/core'
import { wrapInArrow } from '../utils/wrapInArrow'
import { createGetterMethod } from '../utils/wrapInGetter'

type Attributes = (t.JSXSpreadAttribute | t.JSXAttribute)[]

export function handleComponentProps(
  jsxElementPath: NodePath<t.JSXElement>,
  attributes: Attributes
) {
  const props: (t.ObjectProperty | t.ObjectMethod)[] = []
  const reservedProps: t.ObjectProperty[] = []

  // props
  function addProp(name: string, value: t.Expression | t.Literal) {
    // propName: propValue
    if (t.isLiteral(value) || t.isIdentifier(value)) {
      const objectProperty = t.objectProperty(t.identifier(name), value)
      props.push(objectProperty)
    } else {
      // get propName {  return propValue }
      const objectMethod = createGetterMethod(name, value)
      props.push(objectMethod)
    }
  }

  for (const attribute of attributes) {
    // spread attribute
    if (t.isJSXSpreadAttribute(attribute)) {
      throw jsxElementPath.buildCodeFrameError('Spread props are not allowed')
      // data.props.push(t.spreadElement(attribute.argument))
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

          const wrappedExpr =
            t.isLiteral(expr) || t.isIdentifier(expr) ? expr : wrapInArrow(expr)

          const propExpr = t.objectProperty(
            t.stringLiteral(
              `${attrNamespace.namespace.name}:${attrNamespace.name.name}`
            ),
            wrappedExpr
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
