import { EventHandler } from '../common'

type ClipBoardEvents =
  | 'copy'
  | 'copyCapture'
  | 'cut'
  | 'cutCapture'
  | 'paste'
  | 'pasteCapture'

type CompositionEvents =
  | 'compositionEnd'
  | 'compositionEndCapture'
  | 'compositionStart'
  | 'compositionStartCapture'
  | 'compositionUpdate'
  | 'compositionUpdateCapture?'

type FocusEvents = 'Focus' | 'FocusCapture' | 'Blur' | 'BlurCapture'

type FormEvents =
  | 'change'
  | 'changeCapture'
  | 'beforeInput'
  | 'beforeInputCapture'
  | 'input'
  | 'inputCapture'
  | 'reset'
  | 'resetCapture'
  | 'submit'
  | 'submitCapture'
  | 'invalid'
  | 'invalidCapture'

type ImageEvents =
  | 'load'
  | 'loadCapture'
  | 'error' // also a Media Event
  | 'errorCapture' // also a Media Event

type KeyBoardEvents =
  | 'keyDown'
  | 'keyDownCapture'
  | 'keyPress'
  | 'keyPressCapture'
  | 'keyUp'
  | 'keyUpCapture'

// Media Events
type MediaEvents =
  | 'abort'
  | 'abortCapture'
  | 'canPlay'
  | 'canPlayCapture'
  | 'canPlayThrough'
  | 'canPlayThroughCapture'
  | 'durationChange'
  | 'durationChangeCapture'
  | 'emptied'
  | 'emptiedCapture'
  | 'encrypted'
  | 'encryptedCapture'
  | 'ended'
  | 'endedCapture'
  | 'loadedData'
  | 'loadedDataCapture'
  | 'loadedMetadata'
  | 'loadedMetadataCapture'
  | 'loadStart'
  | 'loadStartCapture'
  | 'pause'
  | 'pauseCapture'
  | 'play'
  | 'playCapture'
  | 'playing'
  | 'playingCapture'
  | 'progress'
  | 'progressCapture'
  | 'rateChange'
  | 'rateChangeCapture'
  | 'seeked'
  | 'seekedCapture'
  | 'seeking'
  | 'seekingCapture'
  | 'stalled'
  | 'stalledCapture'
  | 'suspend'
  | 'suspendCapture'
  | 'timeUpdate'
  | 'timeUpdateCapture'
  | 'volumeChange'
  | 'volumeChangeCapture'
  | 'waiting'
  | 'waitingCapture'

type MouseEvents =
  | 'auxClick'
  | 'auxClickCapture'
  | 'click'
  | 'clickCapture'
  | 'contextMenu'
  | 'contextMenuCapture'
  | 'doubleClick'
  | 'doubleClickCapture'
  | 'mouseDown'
  | 'mouseDownCapture'
  | 'mouseEnter'
  | 'mouseLeave'
  | 'mouseMove'
  | 'mouseMoveCapture'
  | 'mouseOut'
  | 'mouseOutCapture'
  | 'mouseOver'
  | 'mouseOverCapture'
  | 'mouseUp'
  | 'mouseUpCapture'

type DragEvents =
  | 'drag'
  | 'dragCapture'
  | 'dragEnd'
  | 'dragEndCapture'
  | 'dragEnter'
  | 'dragEnterCapture'
  | 'dragExit'
  | 'dragExitCapture'
  | 'dragLeave'
  | 'dragLeaveCapture'
  | 'dragOver'
  | 'dragOverCapture'
  | 'dragStart'
  | 'dragStartCapture'
  | 'drop'
  | 'dropCapture'

type SelectionEvents = 'select' | 'selectCapture'

type TouchEvents =
  | 'touchCancel'
  | 'touchCancelCapture'
  | 'touchEnd'
  | 'touchEndCapture'
  | 'touchMove'
  | 'touchMoveCapture'
  | 'touchStart'
  | 'touchStartCapture'

type PointerEvents =
  | 'pointerDown'
  | 'pointerDownCapture'
  | 'pointerMove'
  | 'pointerMoveCapture'
  | 'pointerUp'
  | 'pointerUpCapture'
  | 'pointerCancel'
  | 'pointerCancelCapture'
  | 'pointerEnter'
  | 'pointerEnterCapture'
  | 'pointerLeave'
  | 'pointerLeaveCapture'
  | 'pointerOver'
  | 'pointerOverCapture'
  | 'pointerOut'
  | 'pointerOutCapture'
  | 'gotPointerCapture'
  | 'gotPointerCaptureCapture'
  | 'lostPointerCapture'
  | 'lostPointerCaptureCapture'

type UIEvents = 'scroll' | 'scrollCapture'

type WheelEvents = 'wheel' | 'wheelCapture'

type AnimationEvents =
  | 'animationStart'
  | 'animationStartCapture'
  | 'animationEnd'
  | 'animationEndCapture'
  | 'animationIteration'
  | 'animationIterationCapture'

type TransitionEvents = 'transitionEnd' | 'transitionEndCapture'

export type Events<T> = {
  [K in `on:${ClipBoardEvents}`]?: EventHandler<T>
} & {
  [K in `on:${CompositionEvents}`]?: EventHandler<T>
} & {
  [K in `on:${FocusEvents}`]?: EventHandler<T>
} & {
  [K in `on:${FormEvents}`]?: EventHandler<T>
} & {
  [K in `on:${ImageEvents}`]?: EventHandler<T>
} & {
  [K in `on:${KeyBoardEvents}`]?: EventHandler<T>
} & {
  [K in `on:${MediaEvents}`]?: EventHandler<T>
} & {
  [K in `on:${MouseEvents}`]?: EventHandler<T>
} & {
  [K in `on:${DragEvents}`]?: EventHandler<T>
} & {
  [K in `on:${SelectionEvents}`]?: EventHandler<T>
} & {
  [K in `on:${TouchEvents}`]?: EventHandler<T>
} & {
  [K in `on:${PointerEvents}`]?: EventHandler<T>
} & {
  [K in `on:${UIEvents}`]?: EventHandler<T>
} & {
  [K in `on:${WheelEvents}`]?: EventHandler<T>
} & {
  [K in `on:${AnimationEvents}`]?: EventHandler<T>
} & {
  [K in `on:${TransitionEvents}`]?: EventHandler<T>
}
