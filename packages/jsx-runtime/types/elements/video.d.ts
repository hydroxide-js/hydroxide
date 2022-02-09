import { MediaHTMLAttributes } from '../attributes/media-attributes'

interface VideoHTMLAttributes<T> extends MediaHTMLAttributes<T> {
  height?: number | string | undefined
  playsInline?: boolean | undefined
  poster?: string | undefined
  width?: number | string | undefined
  disablePictureInPicture?: boolean | undefined
  disableRemotePlayback?: boolean | undefined
}

export type JSXVideoElement = VideoHTMLAttributes<HTMLVideoElement>
