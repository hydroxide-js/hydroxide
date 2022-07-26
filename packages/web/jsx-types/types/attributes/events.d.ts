import { CallbackTuple, EventHandler } from '../common'

type ClipBoardEvents =
  | 'copy'
  | 'copycapture'
  | 'cut'
  | 'cutcapture'
  | 'paste'
  | 'pastecapture'

type CompositionEvents =
  | 'compositionend'
  | 'compositionendcapture'
  | 'compositionstart'
  | 'compositionstartcapture'
  | 'compositionupdate'
  | 'compositionupdatecapture?'

type FocusEvents = 'focus' | 'focuscapture' | 'blur' | 'blurcapture'

type FormEvents =
  | 'change'
  | 'changecapture'
  | 'beforeinput'
  | 'beforeinputcapture'
  | 'input'
  | 'inputcapture'
  | 'reset'
  | 'resetcapture'
  | 'submit'
  | 'submitcapture'
  | 'invalid'
  | 'invalidcapture'

type ImageEvents =
  | 'load'
  | 'loadcapture'
  | 'error' // also a Media Event
  | 'errorcapture' // also a Media Event

type KeyBoardEvents =
  | 'keydown'
  | 'keydowncapture'
  | 'keypress'
  | 'keypresscapture'
  | 'keyup'
  | 'keyupcapture'

// Media Events
type MediaEvents =
  | 'abort'
  | 'abortcapture'
  | 'canplay'
  | 'canplaycapture'
  | 'canplaythrough'
  | 'canplaythroughcapture'
  | 'durationchange'
  | 'durationchangecapture'
  | 'emptied'
  | 'emptiedcapture'
  | 'encrypted'
  | 'encryptedcapture'
  | 'ended'
  | 'endedcapture'
  | 'loadeddata'
  | 'loadeddatacapture'
  | 'loadedmetadata'
  | 'loadedmetadatacapture'
  | 'loadstart'
  | 'loadstartcapture'
  | 'pause'
  | 'pausecapture'
  | 'play'
  | 'playcapture'
  | 'playing'
  | 'playingcapture'
  | 'progress'
  | 'progresscapture'
  | 'ratechange'
  | 'ratechangecapture'
  | 'seeked'
  | 'seekedcapture'
  | 'seeking'
  | 'seekingcapture'
  | 'stalled'
  | 'stalledcapture'
  | 'suspend'
  | 'suspendcapture'
  | 'timeupdate'
  | 'timeupdatecapture'
  | 'volumechange'
  | 'volumechangecapture'
  | 'waiting'
  | 'waitingcapture'

type MouseEvents =
  | 'auxclick'
  | 'auxclickcapture'
  | 'click'
  | 'clickcapture'
  | 'contextmenu'
  | 'contextmenucapture'
  | 'doubleclick'
  | 'doubleclickcapture'
  | 'mousedown'
  | 'mousedowncapture'
  | 'mouseenter'
  | 'mouseleave'
  | 'mousemove'
  | 'mousemovecapture'
  | 'mouseout'
  | 'mouseoutcapture'
  | 'mouseover'
  | 'mouseovercapture'
  | 'mouseup'
  | 'mouseupcapture'

type DragEvents =
  | 'drag'
  | 'dragcapture'
  | 'dragend'
  | 'dragendcapture'
  | 'dragenter'
  | 'dragentercapture'
  | 'dragexit'
  | 'dragexitcapture'
  | 'dragleave'
  | 'dragleavecapture'
  | 'dragover'
  | 'dragovercapture'
  | 'dragstart'
  | 'dragstartcapture'
  | 'drop'
  | 'dropcapture'

type SelectionEvents = 'select' | 'selectcapture'

type TouchEvents =
  | 'touchcancel'
  | 'touchcancelcapture'
  | 'touchend'
  | 'touchendcapture'
  | 'touchmove'
  | 'touchmovecapture'
  | 'touchstart'
  | 'touchstartcapture'

type PointerEvents =
  | 'pointerdown'
  | 'pointerdowncapture'
  | 'pointermove'
  | 'pointermovecapture'
  | 'pointerup'
  | 'pointerupcapture'
  | 'pointercancel'
  | 'pointercancelcapture'
  | 'pointerenter'
  | 'pointerentercapture'
  | 'pointerleave'
  | 'pointerleavecapture'
  | 'pointerover'
  | 'pointerovercapture'
  | 'pointerout'
  | 'pointeroutcapture'
  | 'gotpointercapture'
  | 'gotpointercapturecapture'
  | 'lostpointercapture'
  | 'lostpointercapturecapture'

type UIEvents = 'scroll' | 'scrollcapture'

type WheelEvents = 'wheel' | 'wheelcapture'

type AnimationEvents =
  | 'animationstart'
  | 'animationstartcapture'
  | 'animationend'
  | 'animationendcapture'
  | 'animationiteration'
  | 'animationiterationcapture'

type TransitionEvents = 'transitionend' | 'transitionendcapture'

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
