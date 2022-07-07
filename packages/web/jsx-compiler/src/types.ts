import * as t from '@babel/types'
import { NodePath } from '@babel/traverse'

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

export type ProgramInfo = {
  path: Program
  imports: Map<string, t.Identifier>
  usedEvents: Set<string>
}

export namespace Hydration {
  export type SingleAttr = {
    type: 'SingleAttr'
    data: { name: string; value: t.Expression }
    address: number[]
  }

  export type SingleProp = {
    type: 'SingleProp'
    data: { name: string; value: t.Expression }
    address: number[]
  }

  export type MultipleAttr = {
    type: 'MultipleAttr'
    data: { name: string; value: t.Expression }[]
    address: number[]
  }

  export type StaticAttr = {
    type: 'StaticAttr'
    data: { name: string; value: t.Identifier }
    address: number[]
  }

  export type StaticProp = {
    type: 'StaticProp'
    data: { name: string; value: t.Identifier | t.Literal }
    address: number[]
  }

  export type Insert = {
    type: 'Insert'
    data: t.Expression | t.Identifier
    address: number[]
  }

  export type Branch = {
    type: 'Branch'
    data: t.Expression[]
    address: number[]
  }

  export type Comp = {
    type: 'Comp'
    data: t.Expression[]
    address: number[]
  }

  export type Event = {
    type: 'Event'
    data: [eventName: string, handler: t.Expression]
    address: number[]
  }

  export type Ref = {
    type: 'Ref'
    data: t.Identifier
    address: number[]
  }
}

export type AnyHydration =
  | Hydration.SingleAttr
  | Hydration.Insert
  | Hydration.Branch
  | Hydration.Comp
  | Hydration.Event
  | Hydration.StaticAttr
  | Hydration.StaticProp
  | Hydration.MultipleAttr
  | Hydration.SingleProp
  | Hydration.Ref

export type JSXInfo = {
  html: string
  hydrations: AnyHydration[]
  type: 'text' | 'element' | 'component' | 'expr' | 'ignore'
}

export type JSXAttributePath = NodePath<t.JSXAttribute> | NodePath<t.JSXSpreadAttribute>

export type ChildPath =
  | NodePath<t.JSXElement>
  | NodePath<t.JSXExpressionContainer>
  | NodePath<t.JSXSpreadChild>
  | NodePath<t.JSXFragment>
  | NodePath<t.JSXText>

export type SLiteral = Exclude<t.Literal, t.RegExpLiteral | t.NullLiteral>

export type Attribute = t.JSXSpreadAttribute | t.JSXAttribute
