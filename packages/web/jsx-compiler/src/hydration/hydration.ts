import { types as t } from '@babel/core'
import { valueToAST } from '../utils/valueToAST'
import { Hydration } from './types'

export function conditionalElHydration(address: number[]) {
  return t.arrayExpression([
    valueToAST(Hydration.Types.CondEl),
    valueToAST(address)
  ])
}

export function attrHydration(attributeValue: string, address: number[]) {
  return valueToAST([Hydration.Types.Attr, address, attributeValue])
}

export function propsHydration(address: number[]) {
  return valueToAST([Hydration.Types.Props, address])
}

export function compHydration(address: number[]) {
  return t.arrayExpression([
    valueToAST(Hydration.Types.Comp),
    valueToAST(address)
  ])
}

export function textHydration(address: number[]) {
  return valueToAST([Hydration.Types.Text, address])
}
