import { DynamicPart, DynamicParts } from '../types/DynamicPart'
import { NodeAddress } from '../utils/getNodeByAddress'
import { reactiveTextMarker } from './markers'

export function reactiveToHTML(
  dynamicParts: DynamicParts,
  domAddress: NodeAddress,
  jsxAddress: NodeAddress
) {
  const dynamicText: DynamicPart.Text = {
    domAddress: domAddress,
    jsxAddress: jsxAddress,
    text: true
  }

  dynamicParts.push(dynamicText)
  return reactiveTextMarker
}
