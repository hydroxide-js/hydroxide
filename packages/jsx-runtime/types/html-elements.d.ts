import { HTMLAttributes } from './attributes/html-attributes'
import { ValueOrReactiveCollection } from './common'
import { JSXAnchorElement } from './elements/a'
import { JSXAreaElement } from './elements/area'
import { JSXAudioElement } from './elements/audio'
import { JSXBaseElement } from './elements/base'
import { JSXBlockquoteElement } from './elements/blockquote'
import { ButtonHTMLAttributes } from './elements/button'
import { JSXCanvasElement } from './elements/canvas'
import { JSXColElement } from './elements/col'
import { JSXColgroupElement } from './elements/colgroup'
import { JSXDataElement } from './elements/data'
import { JSXDelElement } from './elements/del'
import { JSXDetailsElement } from './elements/details'
import { JSXDialogElement } from './elements/dialog'
import { JSXEmbedElement } from './elements/embed'
import { JSXFieldsetElement } from './elements/fieldset'
import { JSXFormElement } from './elements/form'
import { JSXHtmlElement } from './elements/html'
import { IframeHTMLAttributes } from './elements/iframe'
import { ImgHTMLAttributes } from './elements/img'
import { JSXInputElement } from './elements/input'
import { JSXInsElement } from './elements/ins'
import { JSXKeygenElement } from './elements/keygen'
import { JSXLabelElement } from './elements/label'
import { JSXLiElement } from './elements/li'
import { JSXLinkElement } from './elements/link'
import { JSXMapElement } from './elements/map'
import { JSXMenuElement } from './elements/menu'
import { JSXMetaElement } from './elements/meta'
import { JSXMeterElement } from './elements/meter'
import { JSXObjectElement } from './elements/object'
import { JSXOlElement } from './elements/ol'
import { JSXOptElement } from './elements/optgroup'
import { JSXOptionElement } from './elements/option'
import { JSXOutputElement } from './elements/output'
import { JSXParamElement } from './elements/param'
import { JSXProgressElement } from './elements/progress'
import { JSXQuoteElement } from './elements/q'
import { JSXScriptElement } from './elements/script'
import { JSXSelectElement } from './elements/select'
import { JSXSlotElement } from './elements/slot'
import { JSXSourceElement } from './elements/source'
import { JSXStyleElement } from './elements/style'
import { JSXTableElement } from './elements/table'
import { JSXTdElement } from './elements/td'
import { JSXTextAreElement } from './elements/textarea'
import { JSXThElement } from './elements/th'
import { JSXTimeElement } from './elements/time'
import { JSXTrackElement } from './elements/track'
import { JSXVideoElement } from './elements/video'
import { JSXWebviewElement } from './elements/webview'

type GeneralHTMLAttributes = HTMLAttributes<HTMLElement>
type HeadingAttributes = HTMLAttributes<HTMLHeadingElement>

export type HTMLElements = ValueOrReactiveCollection<{
  /** creates a hyperlink to web pages, files, email addresses, locations in the same page, or anything else a URL can address. */
  a: JSXAnchorElement

  /** represents an abbreviation or acronym; the optional title attribute can provide an expansion or description for the abbreviation. */
  abbr: GeneralHTMLAttributes

  /** indicates that the enclosed HTML provides contact information for a person or people, or for an organization. */
  address: GeneralHTMLAttributes

  /** defines an area inside an image <map> that allows geometric areas on an image to be associated with hypertext link. */
  area: JSXAreaElement

  /**
   * Represents a self-contained composition.
   *
   * Examples: a forum post, a newspaper article, or a blog entry, a product card, a user-submitted comment, an interactive widget or gadget, or any other independent item of content.
   */
  article: GeneralHTMLAttributes

  /** represents a portion of a document whose content is only indirectly related to the document's main content */
  aside: GeneralHTMLAttributes

  /** embed sound content in documents */
  audio: JSXAudioElement

  /** draw the reader's attention to the element's contents, which are not otherwise granted special importance.  */
  b: GeneralHTMLAttributes

  /** specifies the base URL to use for all relative URLs in a document. There can be only one <base> element in a document. */
  base: JSXBaseElement

  /** tells the browser's bidirectional algorithm to treat the text it contains in isolation from its surrounding text. */
  bdi: GeneralHTMLAttributes

  /** overrides the current directionality of text, so that the text within is rendered in a different direction. */
  bdo: GeneralHTMLAttributes

  /** indicates that the enclosed text is an extended quotation. */
  blockquote: JSXBlockquoteElement

  /** represents the content of an HTML document */
  body: HTMLAttributes<HTMLBodyElement>

  /**  produces a line break in text (carriage-return). */
  br: HTMLAttributes<HTMLBRElement>

  /** represents a clickable button */
  button: ButtonHTMLAttributes<HTMLButtonElement>

  /** draw graphics and animations. */
  canvas: JSXCanvasElement

  /** specifies the caption (or title) of a table. */
  caption: GeneralHTMLAttributes

  /** describe a reference to a cited creative work, and must include the title of that work. */
  cite: GeneralHTMLAttributes

  /** displays its contents styled to indicate that the text is computer code */
  code: GeneralHTMLAttributes

  /** defines a column within a table and is used for defining common semantics on all common cells. It is generally found within a <colgroup> element. */
  col: JSXColElement

  /** defines a group of columns within a table. */
  colgroup: JSXColgroupElement

  /** links a given piece of content with a machine-readable translation.
   *
   * If the content is time- or date-related, the <time> element must be used.
   * */
  data: JSXDataElement

  /**
   * contains a set of <option> elements that represent the permissible options available to choose from.
   */
  datalist: HTMLAttributes<HTMLDataListElement>

  /**
   * provides the description, definition, or value for the preceding term (<dt>) in a description list (<dl>).
   */
  dd: GeneralHTMLAttributes

  /** `<del>` represents a range of text that has been deleted from a document. This can be used when rendering "track changes" or source code diff information
   *
   * The `<ins>` element can be used for the opposite purpose: to indicate text that has been added to the document.
   */
  del: JSXDelElement

  /**
   * `<details>` creates a disclosure widget in which information is visible only when the widget is toggled into an "open" state.
   *
   * A summary or label must be provided using the `<summary>` element.
   */
  details: JSXDetailsElement

  /** indicate the term being defined within the context of a definition phrase or sentence */
  dfn: GeneralHTMLAttributes

  /** represents a dialog box or other interactive component, such as a dismissible alert, inspector, or subwindow. */
  dialog: JSXDialogElement

  /** generic container */
  div: HTMLAttributes<HTMLDivElement>

  /** represents a description list
   *
   * The element encloses a list of groups of terms (specified using the `<dt>` element) and descriptions (provided by `<dd>` elements).
   */
  dl: HTMLAttributes<HTMLDListElement>

  /**
   * specifies a term in a description or definition list, and as such must be used inside a `<dl>` element.
   */
  dt: GeneralHTMLAttributes

  /** marks text that stress emphasis.
   *
   * The <em> element can be nested, with each level of nesting indicating a greater degree of emphasis. */
  em: GeneralHTMLAttributes

  /** embeds external content at the specified point in the document. */
  embed: JSXEmbedElement

  /** group several controls as well as labels ( `<label>` ) within a web form. */
  fieldset: JSXFieldsetElement

  /** caption or legend describing the rest of the contents of its parent `<figure>` element. */
  figcaption: GeneralHTMLAttributes

  /** represents self-contained figure, its caption, and its contents */
  figure: GeneralHTMLAttributes

  /** represents a footer for its nearest sectioning content or sectioning root element
   *
   * typically contains information about the author of the section, copyright data or links to related documents.
   */
  footer: GeneralHTMLAttributes

  /** represents a document section containing interactive controls for submitting information. */
  form: JSXFormElement

  /** section heading level 1 */
  h1: HeadingAttributes
  /** section heading level 2 */
  h2: HeadingAttributes
  /** section heading level 3 */
  h3: HeadingAttributes
  /** section heading level 4 */
  h4: HeadingAttributes
  /** section heading level 5 */
  h5: HeadingAttributes
  /** section heading level 6 */
  h6: HeadingAttributes

  head: HTMLAttributes<HTMLHeadElement>
  header: GeneralHTMLAttributes
  hgroup: GeneralHTMLAttributes
  hr: HTMLAttributes<HTMLHRElement>
  html: JSXHtmlElement

  // i
  i: GeneralHTMLAttributes
  iframe: IframeHTMLAttributes<HTMLIFrameElement>
  img: ImgHTMLAttributes<HTMLImageElement>
  input: JSXInputElement
  ins: JSXInsElement

  // k
  kbd: GeneralHTMLAttributes
  keygen: JSXKeygenElement

  // l
  label: JSXLabelElement
  legend: HTMLAttributes<HTMLLegendElement>
  li: JSXLiElement
  link: JSXLinkElement

  // m
  main: GeneralHTMLAttributes
  map: JSXMapElement
  mark: GeneralHTMLAttributes
  menu: JSXMenuElement
  menuitem: GeneralHTMLAttributes
  meta: JSXMetaElement
  meter: JSXMeterElement

  // n
  nav: GeneralHTMLAttributes
  noindex: GeneralHTMLAttributes
  noscript: GeneralHTMLAttributes

  // o
  object: JSXObjectElement
  ol: JSXOlElement
  optgroup: JSXOptElement
  option: JSXOptionElement
  output: JSXOutputElement

  // p
  p: HTMLAttributes<HTMLParagraphElement>
  param: JSXParamElement
  picture: GeneralHTMLAttributes
  pre: HTMLAttributes<HTMLPreElement>
  progress: JSXProgressElement

  // q
  q: JSXQuoteElement

  // r
  rp: GeneralHTMLAttributes
  rt: GeneralHTMLAttributes
  ruby: GeneralHTMLAttributes

  // s
  s: GeneralHTMLAttributes
  samp: GeneralHTMLAttributes
  slot: JSXSlotElement
  script: JSXScriptElement
  section: GeneralHTMLAttributes
  select: JSXSelectElement
  small: GeneralHTMLAttributes
  source: JSXSourceElement
  span: HTMLAttributes<HTMLSpanElement>
  strong: GeneralHTMLAttributes
  style: JSXStyleElement
  sub: GeneralHTMLAttributes
  summary: GeneralHTMLAttributes
  sup: GeneralHTMLAttributes

  // t
  table: JSXTableElement
  template: HTMLAttributes<HTMLTemplateElement>
  tbody: HTMLAttributes<HTMLTableSectionElement>
  td: JSXTdElement
  textarea: JSXTextAreElement
  tfoot: HTMLAttributes<HTMLTableSectionElement>
  th: JSXThElement
  thead: HTMLAttributes<HTMLTableSectionElement>
  time: JSXTimeElement
  title: HTMLAttributes<HTMLTitleElement>
  tr: HTMLAttributes<HTMLTableRowElement>
  track: JSXTrackElement

  // u
  u: GeneralHTMLAttributes
  ul: HTMLAttributes<HTMLUListElement>

  // v
  var: GeneralHTMLAttributes
  video: JSXVideoElement

  // w
  wbr: GeneralHTMLAttributes
  webview: JSXWebviewElement
}>
