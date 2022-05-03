import { NodePath, types as t } from '@babel/core'

export type PropList = (t.SpreadElement | t.ObjectProperty | t.ObjectMethod)[]

export type JSXNode =
  | t.JSXElement
  | t.JSXText
  | t.JSXExpressionContainer
  | t.JSXSpreadChild
  | t.JSXFragment

export type JSXNodePath =
  | NodePath<t.JSXElement>
  | NodePath<t.JSXText>
  | NodePath<t.JSXExpressionContainer>
  | NodePath<t.JSXSpreadChild>
  | NodePath<t.JSXFragment>

export type Program = NodePath<t.Program>

export type G = {
  program: Program
  imported: boolean
}

export type Output = [
  html: string,
  expressions: t.Expression[],
  hydrations: t.Expression[]
]

export type JSXAttributePath =
  | NodePath<t.JSXAttribute>
  | NodePath<t.JSXSpreadAttribute>
