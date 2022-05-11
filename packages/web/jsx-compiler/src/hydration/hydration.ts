import { types as t } from '@babel/core'
import { valueToAST } from '../utils/valueToAST'

type HydrationTypes = '$Embed' | '$Attr' | '$Comp' | '$CondEl' | '$Branch'

function createHydration(type: HydrationTypes) {
  return (address: number[]) =>
    t.arrayExpression([t.identifier(type), valueToAST(address)])
}

export const Hydrate = {
  $CondEl: createHydration('$CondEl'),
  $Comp: createHydration('$Comp'),
  $Embed: createHydration('$Embed'),
  $Attr: createHydration('$Attr'),
  $Branch: createHydration('$Branch')
}
