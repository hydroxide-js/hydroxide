import { MediaHTMLAttributes } from '../attributes/media-attributes'

interface VideoHTMLAttributes<T> extends MediaHTMLAttributes<T> {
  height?: number | string
  playsinline?: boolean
  poster?: string
  width?: number | string
  disablepictureinpicture?: boolean
  disableremoteplayback?: boolean
}

export type JSXVideoElement = VideoHTMLAttributes<HTMLVideoElement>
