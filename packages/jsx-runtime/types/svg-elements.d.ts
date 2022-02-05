import { SVGAttributes } from './attributes/svg-attributes'

type SVGProps<T> = SVGAttributes<T>

export type SVGElements = {
  svg: SVGProps<SVGSVGElement>
  animate: SVGProps<SVGElement> // TODO: It is SVGAnimateElement but is not in TypeScript's lib.dom.d.ts for now.
  animateMotion: SVGProps<SVGElement>
  animateTransform: SVGProps<SVGElement> // TODO: It is SVGAnimateTransformElement but is not in TypeScript's lib.dom.d.ts for now.
  circle: SVGProps<SVGCircleElement>
  clipPath: SVGProps<SVGClipPathElement>
  defs: SVGProps<SVGDefsElement>
  desc: SVGProps<SVGDescElement>
  ellipse: SVGProps<SVGEllipseElement>
  feBlend: SVGProps<SVGFEBlendElement>
  feColorMatrix: SVGProps<SVGFEColorMatrixElement>
  feComponentTransfer: SVGProps<SVGFEComponentTransferElement>
  feComposite: SVGProps<SVGFECompositeElement>
  feConvolveMatrix: SVGProps<SVGFEConvolveMatrixElement>
  feDiffuseLighting: SVGProps<SVGFEDiffuseLightingElement>
  feDisplacementMap: SVGProps<SVGFEDisplacementMapElement>
  feDistantLight: SVGProps<SVGFEDistantLightElement>
  feDropShadow: SVGProps<SVGFEDropShadowElement>
  feFlood: SVGProps<SVGFEFloodElement>
  feFuncA: SVGProps<SVGFEFuncAElement>
  feFuncB: SVGProps<SVGFEFuncBElement>
  feFuncG: SVGProps<SVGFEFuncGElement>
  feFuncR: SVGProps<SVGFEFuncRElement>
  feGaussianBlur: SVGProps<SVGFEGaussianBlurElement>
  feImage: SVGProps<SVGFEImageElement>
  feMerge: SVGProps<SVGFEMergeElement>
  feMergeNode: SVGProps<SVGFEMergeNodeElement>
  feMorphology: SVGProps<SVGFEMorphologyElement>
  feOffset: SVGProps<SVGFEOffsetElement>
  fePointLight: SVGProps<SVGFEPointLightElement>
  feSpecularLighting: SVGProps<SVGFESpecularLightingElement>
  feSpotLight: SVGProps<SVGFESpotLightElement>
  feTile: SVGProps<SVGFETileElement>
  feTurbulence: SVGProps<SVGFETurbulenceElement>
  filter: SVGProps<SVGFilterElement>
  foreignObject: SVGProps<SVGForeignObjectElement>
  g: SVGProps<SVGGElement>
  image: SVGProps<SVGImageElement>
  line: SVGProps<SVGLineElement>
  linearGradient: SVGProps<SVGLinearGradientElement>
  marker: SVGProps<SVGMarkerElement>
  mask: SVGProps<SVGMaskElement>
  metadata: SVGProps<SVGMetadataElement>
  mpath: SVGProps<SVGElement>
  path: SVGProps<SVGPathElement>
  pattern: SVGProps<SVGPatternElement>
  polygon: SVGProps<SVGPolygonElement>
  polyline: SVGProps<SVGPolylineElement>
  radialGradient: SVGProps<SVGRadialGradientElement>
  rect: SVGProps<SVGRectElement>
  stop: SVGProps<SVGStopElement>
  switch: SVGProps<SVGSwitchElement>
  symbol: SVGProps<SVGSymbolElement>
  text: SVGProps<SVGTextElement>
  textPath: SVGProps<SVGTextPathElement>
  tspan: SVGProps<SVGTSpanElement>
  use: SVGProps<SVGUseElement>
  view: SVGProps<SVGViewElement>
}
