type Path = number[]

export const enum HydrationTypes {
  Text, // 0
  Event, // 1
  Attr, // 2
  Comp, // 3
  Props, // 4
  CondEl // 5
}

export type HydrateComp = [type: HydrationTypes.Comp, path: Path]
export type HydrateText = [type: HydrationTypes.Text, path: Path]

export type HydrateAttribute = [
  type: HydrationTypes.Attr,
  path: Path,
  attrName: string
]

type HydrateEvent = [type: HydrationTypes.Event, path: Path, event: string]

export type Hydration =
  | HydrateComp
  | HydrateText
  | HydrateAttribute
  | HydrateEvent
