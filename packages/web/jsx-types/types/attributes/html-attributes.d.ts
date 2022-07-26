import { Booleanish, numOrStr, SpecialAttributes } from '../common'
import { AriaAttributes, AriaRole } from './aria'
import { Events } from './events'

export interface HTMLAttributes<T>
  extends AriaAttributes,
    DOMAttributes<T>,
    SpecialAttributes<T> {
  // Standard HTML Attributes
  accessKey?: string
  class?: string
  contenteditable?: Booleanish | 'inherit'
  contextmenu?: string
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
  radiogroup?: string // <command>, <menuitem>

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
  autocapitalize?: string
  autocorrect?: string
  autosave?: string
  color?: string
  itemprop?: string
  itemscope?: boolean
  itemtype?: string
  itemid?: string
  itemref?: string
  results?: number
  security?: string
  unselectable?: 'on' | 'off'

  // Living Standard
  /**
   * Hints at the type of data that might be entered by the user while editing the element or its contents
   * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
   */
  inputmode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search'

  /**
   * Specify that a standard HTML element should behave like a defined custom built-in element
   * @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
   */
  is?: string
}

interface AllHTMLAttributes<T> extends HTMLAttributes<T> {
  // Standard HTML Attributes
  accept?: string
  acceptcharset?: string
  action?: string
  allowfullScreen?: boolean
  allowtransparency?: boolean
  alt?: string
  as?: string
  async?: boolean

  // auto
  autocomplete?: string
  autofocus?: boolean
  autoplay?: boolean

  capture?: boolean | 'user' | 'environment'
  cellpadding?: numOrStr
  cellspacing?: numOrStr
  charset?: string
  challenge?: string
  checked?: boolean
  cite?: string
  classid?: string
  cols?: number
  colspan?: number
  content?: string
  controls?: boolean
  coords?: string
  crossorigin?: string
  data?: string
  datetime?: string
  default?: boolean
  defer?: boolean
  disabled?: boolean
  download?: any
  enctype?: string

  // form
  form?: string
  formaction?: string
  formcnctype?: string
  formmethod?: string
  formnovalidate?: boolean
  formtarget?: string
  frameBorder?: numOrStr
  headers?: string
  height?: numOrStr
  high?: number
  href?: string
  hreflang?: string
  for?: string
  httpequiv?: string
  integrity?: string
  keyparams?: string
  keytype?: string
  kind?: string
  label?: string
  list?: string
  loop?: boolean
  low?: number
  manifest?: string
  marginheight?: number
  marginwidth?: number
  max?: numOrStr
  maxlength?: number
  media?: string
  mediagroup?: string
  method?: string
  min?: numOrStr
  minlength?: number
  multiple?: boolean
  muted?: boolean
  name?: string
  nonce?: string
  novalidate?: boolean
  open?: boolean
  optimum?: number
  pattern?: string
  placeholder?: string
  playsinline?: boolean
  poster?: string
  preload?: string
  readonly?: boolean
  rel?: string
  required?: boolean
  reversed?: boolean
  rows?: number
  rowspan?: number
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
  srcdoc?: string
  srclang?: string
  srcset?: string
  start?: number
  step?: numOrStr
  summary?: string
  target?: string
  type?: string
  usemap?: string
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
