import { GenericPassableProps, PassableProps, Props } from './props'

export type Renderer<P extends GenericPassableProps> = (
  props: Props<P>
) => JSX.Element

export type Component<P extends GenericPassableProps> = (
  passableProps: PassableProps<P>
) => JSX.Element
