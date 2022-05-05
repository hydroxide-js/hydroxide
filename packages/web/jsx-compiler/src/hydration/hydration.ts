import { types as t } from '@babel/core'
import { Hydration } from '../types'
import { valueToAST } from '../utils/valueToAST'

export function conditionalElHydration(address: number[]) {
  return t.arrayExpression([
    valueToAST(Hydration.Types.CondEl),
    valueToAST(address)
  ])
}

export function compHydration(address: number[]) {
  return t.arrayExpression([
    valueToAST(Hydration.Types.Comp),
    valueToAST(address)
  ])
}

export function textHydration(address: number[]) {
  return valueToAST([Hydration.Types.Embed, address])
}

export function attributesHydration(address: number[]) {
  return valueToAST([Hydration.Types.Attributes, address])
}
