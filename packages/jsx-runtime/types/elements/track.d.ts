import { HTMLAttributes } from '../attributes'

interface TrackHTMLAttributes<T> extends HTMLAttributes<T> {
  default?: boolean | undefined
  kind?: string | undefined
  label?: string | undefined
  src?: string | undefined
  srcLang?: string | undefined
}

export type JSXTrackElement = TrackHTMLAttributes<HTMLTrackElement>
