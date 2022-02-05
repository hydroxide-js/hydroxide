export type Booleanish = boolean | 'true' | 'false'

export type EventHandler<T> = (event: Event & { target: T }) => void

export type numOrStr = number | string
