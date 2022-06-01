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

export type AttrHydration = {
  type: 'Attr'
  data: t.ObjectExpression
  address: number[]
}

export type InsertHydration = {
  type: 'Insert'
  data: t.Expression | t.Identifier
  address: number[]
}

export type BranchHydration = {
  type: 'Branch'
  data: t.Expression[]
  address: number[]
}

export type CompHydration = {
  type: 'Comp'
  data: t.ArrayExpression
  address: number[]
}

export type Hydration =
  | AttrHydration
  | InsertHydration
  | BranchHydration
  | CompHydration

export type JSXInfo = {
  html: string
  hydrations: Hydration[]
  type: 'text' | 'element' | 'component' | 'expr' | 'text_from_expr' | 'ignore'
}

export type JSXAttributePath =
  | NodePath<t.JSXAttribute>
  | NodePath<t.JSXSpreadAttribute>

export type ChildPath =
  | NodePath<t.JSXElement>
  | NodePath<t.JSXExpressionContainer>
  | NodePath<t.JSXSpreadChild>
  | NodePath<t.JSXFragment>
  | NodePath<t.JSXText>
