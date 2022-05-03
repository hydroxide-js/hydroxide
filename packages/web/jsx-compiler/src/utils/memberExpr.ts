import { NodePath, template, types as t } from '@babel/core'
import { JSXNode } from '../types'

export function JSXMemberExpToMemberExp(jsxNodePath: NodePath<JSXNode>) {
  const jsxMemberExprPath = jsxNodePath.get(
    'openingElement.name'
  ) as NodePath<t.JSXMemberExpression>
  const statement = template.ast(
    jsxMemberExprPath.getSource()
  ) as t.ExpressionStatement
  const memberExpr = statement.expression as t.MemberExpression
  return memberExpr
}
