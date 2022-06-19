import { ProgramInfo } from './types'

export const programInfo: ProgramInfo = {
  // @ts-expect-error
  path: null,
  usedEvents: new Set(),
  imports: new Map()
}
