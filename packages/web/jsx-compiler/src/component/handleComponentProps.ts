import { NodePath, types as t } from '@babel/core'
import { DataContainer } from './handleComponent'

type Attributes = (t.JSXSpreadAttribute | t.JSXAttribute)[]

export function handleComponentProps(
  jsxElementPath: NodePath<t.JSXElement>,
  data: DataContainer,
  attributes: Attributes
) {
  // props
  function addProp(name: string, value: t.Expression | t.Literal) {
    // propName: propValue
    const propExpr = t.objectProperty(t.identifier(name), value)

    data.props.push(propExpr)
  }

  for (const attribute of attributes) {
    // spread attribute
    if (t.isJSXSpreadAttribute(attribute)) {
      data.props.push(t.spreadElement(attribute.argument))
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
          if (t.isJSXEmptyExpression(expr)) {
            throw jsxElementPath.buildCodeFrameError(
              'attributes can not have empty value'
            )
          }

          const attrNamespace = attribute.name

          const propExpr = t.objectProperty(
            t.stringLiteral(
              `${attrNamespace.namespace.name}:${attrNamespace.name.name}`
            ),
            expr
          )

          data.reservedProps.push(propExpr)
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
}
