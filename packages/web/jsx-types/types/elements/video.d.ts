import { MediaHTMLAttributes } from '../attributes/media-attributes'

interface VideoHTMLAttributes<T> extends MediaHTMLAttributes<T> {
  height?: number | string
  playsInline?: boolean
  poster?: string
  width?: number | string
  disablePictureInPicture?: boolean
  disableRemotePlayback?: boolean
}

export type JSXVideoElement = VideoHTMLAttributes<HTMLVideoElement>
