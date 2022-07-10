import { CallbackTuple, EventHandler } from '../common'

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

type FocusEvents = 'focus' | 'focusCapture' | 'blur' | 'blurCapture'

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

type EventHandlerOrTuple<T> = EventHandler<T> | CallbackTuple

export type Events<T> = {
  [K in `on-${ClipBoardEvents}`]?: EventHandlerOrTuple<T>
} & {
  [K in `on-${CompositionEvents}`]?: EventHandlerOrTuple<T>
} & {
  [K in `on-${FocusEvents}`]?: EventHandlerOrTuple<T>
} & {
  [K in `on-${FormEvents}`]?: EventHandlerOrTuple<T>
} & {
  [K in `on-${ImageEvents}`]?: EventHandlerOrTuple<T>
} & {
  [K in `on-${KeyBoardEvents}`]?: EventHandlerOrTuple<T>
} & {
  [K in `on-${MediaEvents}`]?: EventHandlerOrTuple<T>
} & {
  [K in `on-${MouseEvents}`]?: EventHandlerOrTuple<T>
} & {
  [K in `on-${DragEvents}`]?: EventHandlerOrTuple<T>
} & {
  [K in `on-${SelectionEvents}`]?: EventHandlerOrTuple<T>
} & {
  [K in `on-${TouchEvents}`]?: EventHandlerOrTuple<T>
} & {
  [K in `on-${PointerEvents}`]?: EventHandlerOrTuple<T>
} & {
  [K in `on-${UIEvents}`]?: EventHandlerOrTuple<T>
} & {
  [K in `on-${WheelEvents}`]?: EventHandlerOrTuple<T>
} & {
  [K in `on-${AnimationEvents}`]?: EventHandlerOrTuple<T>
} & {
  [K in `on-${TransitionEvents}`]?: EventHandlerOrTuple<T>
}
