import { HTMLAttributes } from '../attributes/html-attributes'

interface TrackHTMLAttributes<T> extends HTMLAttributes<T> {
  default?: boolean
  kind?: string
  label?: string
  src?: string
  srcLang?: string
}

export type JSXTrackElement = TrackHTMLAttributes<HTMLTrackElement>
