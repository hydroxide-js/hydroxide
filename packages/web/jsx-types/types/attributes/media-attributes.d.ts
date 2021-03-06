import { HTMLAttributes } from './html-attributes'

interface MediaHTMLAttributes<T> extends HTMLAttributes<T> {
  /**  automatically start playing media as soon as it can do so without stopping */
  autoplay?: boolean

  /** Specifies that media controls should be displayed (such as a play/pause button etc) */
  controls?: boolean

  /** returns a DOMTokenList that helps the user agent select what controls to show on the media element whenever the user agent shows its own set of controls */
  controlslist?: string

  /** defines how the element handles cross-origin requests */
  crossorigin?: string

  /** Specifies that the media will start over again, every time it is finished */
  loop?: boolean

  mediagroup?: string

  /** Specifies that the audio output should be muted */
  muted?: boolean

  playsinline?: boolean

  /** Specifies if and how the media should be loaded when the page loads */
  preload?: string

  /** Specifies the URL of the media file */
  src?: string
}
