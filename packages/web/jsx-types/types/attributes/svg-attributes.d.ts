import { Booleanish, numOrStr } from '../common'
import { AriaAttributes, AriaRole } from './aria'
import { DOMAttributes } from './html-attributes'

//   - union of string literals
interface SVGAttributes<T> extends AriaAttributes, DOMAttributes<T> {
  // Attributes which also defined in HTMLAttributes
  className?: string
  color?: string
  height?: numOrStr
  id?: string
  lang?: string
  max?: numOrStr
  media?: string
  method?: string
  min?: numOrStr
  name?: string
  style?: string
  target?: string
  type?: string
  width?: numOrStr

  // Other HTML properties supported by SVG elements in browsers
  role?: AriaRole
  tabIndex?: number
  crossOrigin?: 'anonymous' | 'use-credentials' | ''

  // SVG Specific attributes
  accentHeight?: numOrStr
  accumulate?: 'none' | 'sum'
  additive?: 'replace' | 'sum'
  alignmentBaseline?:
    | 'auto'
    | 'baseline'
    | 'before-edge'
    | 'text-before-edge'
    | 'middle'
    | 'central'
    | 'after-edge'
    | 'text-after-edge'
    | 'ideographic'
    | 'alphabetic'
    | 'hanging'
    | 'mathematical'
    | 'inherit'
    | undefined
  allowReorder?: 'no' | 'yes'
  alphabetic?: numOrStr
  amplitude?: numOrStr
  arabicForm?: 'initial' | 'medial' | 'terminal' | 'isolated'
  ascent?: numOrStr
  attributeName?: string
  attributeType?: string
  autoReverse?: Booleanish
  azimuth?: numOrStr
  baseFrequency?: numOrStr
  baselineShift?: numOrStr
  baseProfile?: numOrStr
  bbox?: numOrStr
  begin?: numOrStr
  bias?: numOrStr
  by?: numOrStr
  calcMode?: numOrStr
  capHeight?: numOrStr
  clip?: numOrStr
  clipPath?: string
  clipPathUnits?: numOrStr
  clipRule?: numOrStr
  colorInterpolation?: numOrStr
  colorInterpolationFilters?: 'auto' | 'sRGB' | 'linearRGB' | 'inherit'
  colorProfile?: numOrStr
  colorRendering?: numOrStr
  contentScriptType?: numOrStr
  contentStyleType?: numOrStr
  cursor?: numOrStr
  cx?: numOrStr
  cy?: numOrStr
  d?: string
  decelerate?: numOrStr
  descent?: numOrStr
  diffuseConstant?: numOrStr
  direction?: numOrStr
  display?: numOrStr
  divisor?: numOrStr
  dominantBaseline?: numOrStr
  dur?: numOrStr
  dx?: numOrStr
  dy?: numOrStr
  edgeMode?: numOrStr
  elevation?: numOrStr
  enableBackground?: numOrStr
  end?: numOrStr
  exponent?: numOrStr
  externalResourcesRequired?: Booleanish
  fill?: string
  fillOpacity?: numOrStr
  fillRule?: 'nonzero' | 'evenodd' | 'inherit'
  filter?: string
  filterRes?: numOrStr
  filterUnits?: numOrStr
  floodColor?: numOrStr
  floodOpacity?: numOrStr
  focusable?: Booleanish | 'auto'
  fontFamily?: string
  fontSize?: numOrStr
  fontSizeAdjust?: numOrStr
  fontStretch?: numOrStr
  fontStyle?: numOrStr
  fontVariant?: numOrStr
  fontWeight?: numOrStr
  format?: numOrStr
  fr?: numOrStr
  from?: numOrStr
  fx?: numOrStr
  fy?: numOrStr
  g1?: numOrStr
  g2?: numOrStr
  glyphName?: numOrStr
  glyphOrientationHorizontal?: numOrStr
  glyphOrientationVertical?: numOrStr
  glyphRef?: numOrStr
  gradientTransform?: string
  gradientUnits?: string
  hanging?: numOrStr
  horizAdvX?: numOrStr
  horizOriginX?: numOrStr
  href?: string
  ideographic?: numOrStr
  imageRendering?: numOrStr
  in2?: numOrStr
  in?: string
  intercept?: numOrStr
  k1?: numOrStr
  k2?: numOrStr
  k3?: numOrStr
  k4?: numOrStr
  k?: numOrStr
  kernelMatrix?: numOrStr
  kernelUnitLength?: numOrStr
  kerning?: numOrStr
  keyPoints?: numOrStr
  keySplines?: numOrStr
  keyTimes?: numOrStr
  lengthAdjust?: numOrStr
  letterSpacing?: numOrStr
  lightingColor?: numOrStr
  limitingConeAngle?: numOrStr
  local?: numOrStr
  markerEnd?: string
  markerHeight?: numOrStr
  markerMid?: string
  markerStart?: string
  markerUnits?: numOrStr
  markerWidth?: numOrStr
  mask?: string
  maskContentUnits?: numOrStr
  maskUnits?: numOrStr
  mathematical?: numOrStr
  mode?: numOrStr
  numOctaves?: numOrStr
  offset?: numOrStr
  opacity?: numOrStr
  operator?: numOrStr
  order?: numOrStr
  orient?: numOrStr
  orientation?: numOrStr
  origin?: numOrStr
  overflow?: numOrStr
  overlinePosition?: numOrStr
  overlineThickness?: numOrStr
  paintOrder?: numOrStr
  panose1?: numOrStr
  path?: string
  pathLength?: numOrStr
  patternContentUnits?: string
  patternTransform?: numOrStr
  patternUnits?: string
  pointerEvents?: numOrStr
  points?: string
  pointsAtX?: numOrStr
  pointsAtY?: numOrStr
  pointsAtZ?: numOrStr
  preserveAlpha?: Booleanish
  preserveAspectRatio?: string
  primitiveUnits?: numOrStr
  r?: numOrStr
  radius?: numOrStr
  refX?: numOrStr
  refY?: numOrStr
  renderingIntent?: numOrStr
  repeatCount?: numOrStr
  repeatDur?: numOrStr
  requiredExtensions?: numOrStr
  requiredFeatures?: numOrStr
  restart?: numOrStr
  result?: string
  rotate?: numOrStr
  rx?: numOrStr
  ry?: numOrStr
  scale?: numOrStr
  seed?: numOrStr
  shapeRendering?: numOrStr
  slope?: numOrStr
  spacing?: numOrStr
  specularConstant?: numOrStr
  specularExponent?: numOrStr
  speed?: numOrStr
  spreadMethod?: string
  startOffset?: numOrStr
  stdDeviation?: numOrStr
  stemh?: numOrStr
  stemv?: numOrStr
  stitchTiles?: numOrStr
  stopColor?: string
  stopOpacity?: numOrStr
  strikethroughPosition?: numOrStr
  strikethroughThickness?: numOrStr
  string?: numOrStr
  stroke?: string
  strokeDasharray?: numOrStr
  strokeDashoffset?: numOrStr
  strokeLinecap?: 'butt' | 'round' | 'square' | 'inherit'
  strokeLinejoin?: 'miter' | 'round' | 'bevel' | 'inherit'
  strokeMiterlimit?: numOrStr
  strokeOpacity?: numOrStr
  strokeWidth?: numOrStr
  surfaceScale?: numOrStr
  systemLanguage?: numOrStr
  tableValues?: numOrStr
  targetX?: numOrStr
  targetY?: numOrStr
  textAnchor?: string
  textDecoration?: numOrStr
  textLength?: numOrStr
  textRendering?: numOrStr
  to?: numOrStr
  transform?: string
  u1?: numOrStr
  u2?: numOrStr
  underlinePosition?: numOrStr
  underlineThickness?: numOrStr
  unicode?: numOrStr
  unicodeBidi?: numOrStr
  unicodeRange?: numOrStr
  unitsPerEm?: numOrStr
  vAlphabetic?: numOrStr
  values?: string
  vectorEffect?: numOrStr
  version?: string
  vertAdvY?: numOrStr
  vertOriginX?: numOrStr
  vertOriginY?: numOrStr
  vHanging?: numOrStr
  vIdeographic?: numOrStr
  viewBox?: string
  viewTarget?: numOrStr
  visibility?: numOrStr
  vMathematical?: numOrStr
  widths?: numOrStr
  wordSpacing?: numOrStr
  writingMode?: numOrStr
  x1?: numOrStr
  x2?: numOrStr
  x?: numOrStr
  xChannelSelector?: string
  xHeight?: numOrStr
  xlinkActuate?: string
  xlinkArcrole?: string
  xlinkHref?: string
  xlinkRole?: string
  xlinkShow?: string
  xlinkTitle?: string
  xlinkType?: string
  xmlBase?: string
  xmlLang?: string
  xmlns?: string
  xmlnsXlink?: string
  xmlSpace?: string
  y1?: numOrStr
  y2?: numOrStr
  y?: numOrStr
  yChannelSelector?: string
  z?: numOrStr
  zoomAndPan?: string
}