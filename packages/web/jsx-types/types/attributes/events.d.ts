import { EventHandler } from '../common'

type ClipBoardEvents =
  | 'Copy'
  | 'CopyCapture'
  | 'Cut'
  | 'CutCapture'
  | 'Paste'
  | 'PasteCapture'

type CompositionEvents =
  | 'CompositionEnd'
  | 'CompositionEndCapture'
  | 'CompositionStart'
  | 'CompositionStartCapture'
  | 'CompositionUpdate'
  | 'CompositionUpdateCapture?'

type FocusEvents = 'Focus' | 'FocusCapture' | 'Blur' | 'BlurCapture'

type FormEvents =
  | 'Change'
  | 'ChangeCapture'
  | 'BeforeInput'
  | 'BeforeInputCapture'
  | 'Input'
  | 'InputCapture'
  | 'Reset'
  | 'ResetCapture'
  | 'Submit'
  | 'SubmitCapture'
  | 'Invalid'
  | 'InvalidCapture'

type ImageEvents =
  | 'Load'
  | 'LoadCapture'
  | 'Error' // also a Media Event
  | 'ErrorCapture' // also a Media Event

type KeyBoardEvents =
  | 'KeyDown'
  | 'KeyDownCapture'
  | 'KeyPress'
  | 'KeyPressCapture'
  | 'KeyUp'
  | 'KeyUpCapture'

// Media Events
type MediaEvents =
  | 'Abort'
  | 'AbortCapture'
  | 'CanPlay'
  | 'CanPlayCapture'
  | 'CanPlayThrough'
  | 'CanPlayThroughCapture'
  | 'DurationChange'
  | 'DurationChangeCapture'
  | 'Emptied'
  | 'EmptiedCapture'
  | 'Encrypted'
  | 'EncryptedCapture'
  | 'Ended'
  | 'EndedCapture'
  | 'LoadedData'
  | 'LoadedDataCapture'
  | 'LoadedMetadata'
  | 'LoadedMetadataCapture'
  | 'LoadStart'
  | 'LoadStartCapture'
  | 'Pause'
  | 'PauseCapture'
  | 'Play'
  | 'PlayCapture'
  | 'Playing'
  | 'PlayingCapture'
  | 'Progress'
  | 'ProgressCapture'
  | 'RateChange'
  | 'RateChangeCapture'
  | 'Seeked'
  | 'SeekedCapture'
  | 'Seeking'
  | 'SeekingCapture'
  | 'Stalled'
  | 'StalledCapture'
  | 'Suspend'
  | 'SuspendCapture'
  | 'TimeUpdate'
  | 'TimeUpdateCapture'
  | 'VolumeChange'
  | 'VolumeChangeCapture'
  | 'Waiting'
  | 'WaitingCapture'

type MouseEvents =
  | 'AuxClick'
  | 'AuxClickCapture'
  | 'Click'
  | 'ClickCapture'
  | 'ContextMenu'
  | 'ContextMenuCapture'
  | 'DoubleClick'
  | 'DoubleClickCapture'
  | 'MouseDown'
  | 'MouseDownCapture'
  | 'MouseEnter'
  | 'MouseLeave'
  | 'MouseMove'
  | 'MouseMoveCapture'
  | 'MouseOut'
  | 'MouseOutCapture'
  | 'MouseOver'
  | 'MouseOverCapture'
  | 'MouseUp'
  | 'MouseUpCapture'

type DragEvents =
  | 'Drag'
  | 'DragCapture'
  | 'DragEnd'
  | 'DragEndCapture'
  | 'DragEnter'
  | 'DragEnterCapture'
  | 'DragExit'
  | 'DragExitCapture'
  | 'DragLeave'
  | 'DragLeaveCapture'
  | 'DragOver'
  | 'DragOverCapture'
  | 'DragStart'
  | 'DragStartCapture'
  | 'Drop'
  | 'DropCapture'

type SelectionEvents = 'Select' | 'SelectCapture'

type TouchEvents =
  | 'TouchCancel'
  | 'TouchCancelCapture'
  | 'TouchEnd'
  | 'TouchEndCapture'
  | 'TouchMove'
  | 'TouchMoveCapture'
  | 'TouchStart'
  | 'TouchStartCapture'

type PointerEvents =
  | 'PointerDown'
  | 'PointerDownCapture'
  | 'PointerMove'
  | 'PointerMoveCapture'
  | 'PointerUp'
  | 'PointerUpCapture'
  | 'PointerCancel'
  | 'PointerCancelCapture'
  | 'PointerEnter'
  | 'PointerEnterCapture'
  | 'PointerLeave'
  | 'PointerLeaveCapture'
  | 'PointerOver'
  | 'PointerOverCapture'
  | 'PointerOut'
  | 'PointerOutCapture'
  | 'GotPointerCapture'
  | 'GotPointerCaptureCapture'
  | 'LostPointerCapture'
  | 'LostPointerCaptureCapture'

type UIEvents = 'Scroll' | 'ScrollCapture'

type WheelEvents = 'Wheel' | 'WheelCapture'

type AnimationEvents =
  | 'AnimationStart'
  | 'AnimationStartCapture'
  | 'AnimationEnd'
  | 'AnimationEndCapture'
  | 'AnimationIteration'
  | 'AnimationIterationCapture'

type TransitionEvents = 'TransitionEnd' | 'TransitionEndCapture'

export type Events<T> = {
  [K in `on${ClipBoardEvents}`]?: EventHandler<T>
} & {
  [K in `on${CompositionEvents}`]?: EventHandler<T>
} & {
  [K in `on${FocusEvents}`]?: EventHandler<T>
} & {
  [K in `on${FormEvents}`]?: EventHandler<T>
} & {
  [K in `on${ImageEvents}`]?: EventHandler<T>
} & {
  [K in `on${KeyBoardEvents}`]?: EventHandler<T>
} & {
  [K in `on${MediaEvents}`]?: EventHandler<T>
} & {
  [K in `on${MouseEvents}`]?: EventHandler<T>
} & {
  [K in `on${DragEvents}`]?: EventHandler<T>
} & {
  [K in `on${SelectionEvents}`]?: EventHandler<T>
} & {
  [K in `on${TouchEvents}`]?: EventHandler<T>
} & {
  [K in `on${PointerEvents}`]?: EventHandler<T>
} & {
  [K in `on${UIEvents}`]?: EventHandler<T>
} & {
  [K in `on${WheelEvents}`]?: EventHandler<T>
} & {
  [K in `on${AnimationEvents}`]?: EventHandler<T>
} & {
  [K in `on${TransitionEvents}`]?: EventHandler<T>
}
