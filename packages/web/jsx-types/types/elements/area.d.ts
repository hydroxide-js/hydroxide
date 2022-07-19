import {
  HTMLAttributes,
  HTMLAttributeReferrerPolicy
} from '../attributes/html-attributes'

interface AreaHTMLAttributes<T> extends HTMLAttributes<T> {
  /** alternative text for a clickable area in an image map. */
  alt?: string

  /** Defines the shape and size of a clickable area in an image map */
  coords?: string

  /** Prompts the user to save the linked URL instead of navigating to it. */
  download?: string

  /** Defines the URL of the linked document or resource */
  href?: string

  /** Hints at the human language of the linked URL */
  hrefLang?: string

  /** Specifies the media or device the linked document is optimized for */
  media?: string

  /** How much of the referrer to send when following the link. */
  referrerPolicy?: HTMLAttributeReferrerPolicy

  /** defines the relationship between a linked resource and the current document */
  rel?: string

  /** In conjunction with the coords attribute, specifies the shape, size, and placement of a clickable area in an image map. */
  shape?: string

  /** Specifies the context in which to open the linked resource. */
  target?: string

  /** Specified that an area of an image map did not link to another resource */
  nohref?: string

  /** Defines the title text of the clickable area. The title text will appear as a tooltip in most browsers. */
  title: string
}

export type JSXAreaElement = AreaHTMLAttributes<HTMLAreaElement>
