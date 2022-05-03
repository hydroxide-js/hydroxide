import { Booleanish, FrameWorkAttributes, numOrStr } from '../common'
import { AriaAttributes, AriaRole } from './aria'
import { Events } from './events'

export interface HTMLAttributes<T>
  extends AriaAttributes,
    DOMAttributes<T>,
    FrameWorkAttributes {
  // framework attributes
  // $if?: Reactive<any>

  // Standard HTML Attributes
  accessKey?: string
  class?: string
  className?: string
  contentEditable?: Booleanish | 'inherit'
  contextMenu?: string
  dir?: string
  draggable?: Booleanish
  hidden?: boolean
  id?: string
  lang?: string
  placeholder?: string
  slot?: string
  spellCheck?: Booleanish
  style?: string
  tabIndex?: number
  title?: string
  translate?: 'yes' | 'no'

  // Unknown
  radioGroup?: string // <command>, <menuitem>

  // WAI-ARIA
  role?: AriaRole

  // RDFa Attributes
  about?: string
  datatype?: string
  inlist?: any
  prefix?: string
  property?: string
  resource?: string
  typeof?: string
  vocab?: string

  // Non-standard Attributes
  autoCapitalize?: string
  autoCorrect?: string
  autoSave?: string
  color?: string
  itemProp?: string
  itemScope?: boolean
  itemType?: string
  itemID?: string
  itemRef?: string
  results?: number
  security?: string
  unselectable?: 'on' | 'off'

  // Living Standard
  /**
   * Hints at the type of data that might be entered by the user while editing the element or its contents
   * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
   */
  inputMode?:
    | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search'
    | undefined

  /**
   * Specify that a standard HTML element should behave like a defined custom built-in element
   * @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
   */
  is?: string
}

interface AllHTMLAttributes<T> extends HTMLAttributes<T> {
  // Standard HTML Attributes
  accept?: string
  acceptCharset?: string
  action?: string
  allowFullScreen?: boolean
  allowTransparency?: boolean
  alt?: string
  as?: string
  async?: boolean
  autoComplete?: string
  autoFocus?: boolean
  autoPlay?: boolean
  capture?: boolean | 'user' | 'environment'
  cellPadding?: numOrStr
  cellSpacing?: numOrStr
  charSet?: string
  challenge?: string
  checked?: boolean
  cite?: string
  classID?: string
  cols?: number
  colSpan?: number
  content?: string
  controls?: boolean
  coords?: string
  crossOrigin?: string
  data?: string
  dateTime?: string
  default?: boolean
  defer?: boolean
  disabled?: boolean
  download?: any
  encType?: string
  form?: string
  formAction?: string
  formEncType?: string
  formMethod?: string
  formNoValidate?: boolean
  formTarget?: string
  frameBorder?: numOrStr
  headers?: string
  height?: numOrStr
  high?: number
  href?: string
  hrefLang?: string
  htmlFor?: string
  httpEquiv?: string
  integrity?: string
  keyParams?: string
  keyType?: string
  kind?: string
  label?: string
  list?: string
  loop?: boolean
  low?: number
  manifest?: string
  marginHeight?: number
  marginWidth?: number
  max?: numOrStr
  maxLength?: number
  media?: string
  mediaGroup?: string
  method?: string
  min?: numOrStr
  minLength?: number
  multiple?: boolean
  muted?: boolean
  name?: string
  nonce?: string
  noValidate?: boolean
  open?: boolean
  optimum?: number
  pattern?: string
  placeholder?: string
  playsInline?: boolean
  poster?: string
  preload?: string
  readOnly?: boolean
  rel?: string
  required?: boolean
  reversed?: boolean
  rows?: number
  rowSpan?: number
  sandbox?: string
  scope?: string
  scoped?: boolean
  scrolling?: string
  seamless?: boolean
  selected?: boolean
  shape?: string
  size?: number
  sizes?: string
  span?: number
  src?: string
  srcDoc?: string
  srcLang?: string
  srcSet?: string
  start?: number
  step?: numOrStr
  summary?: string
  target?: string
  type?: string
  useMap?: string
  value?: string | ReadonlyArray<string> | number
  width?: numOrStr
  wmode?: string
  wrap?: string
}

export interface DOMAttributes<T> extends Events<T> {
  children?: JSX.Element | JSX.Element[]
}

/**
 * How much of the referrer to send when following the link.
 */
type HTMLAttributeReferrerPolicy =
  | ''
  | 'no-referrer'
  | 'no-referrer-when-downgrade'
  | 'origin'
  | 'origin-when-cross-origin'
  | 'same-origin'
  | 'strict-origin'
  | 'strict-origin-when-cross-origin'
  | 'unsafe-url'

type HTMLInputTypeAttribute =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'
  | (string & {})
