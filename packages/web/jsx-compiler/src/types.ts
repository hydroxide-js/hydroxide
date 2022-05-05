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

export type JSXInfo = {
  html: string
  expressions: t.Expression[]
  hydrations: t.Expression[]
  deleted?: boolean
  type: 'text' | 'element' | 'component'
  isExpr?: boolean
}

export type JSXAttributePath =
  | NodePath<t.JSXAttribute>
  | NodePath<t.JSXSpreadAttribute>

export namespace Hydration {
  export const enum Types {
    Embed, // 0
    Attributes, // 1
    Comp, // 2
    CondEl, // 3
    Branch // 4
  }
}
