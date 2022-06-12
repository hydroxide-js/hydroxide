import { ProgramInfo } from './types'

export const programInfo: ProgramInfo = {
  // @ts-expect-error
  path: null,
  usedEvents: new Set(),
  domImports: new Set(),
  coreImports: new Set(),
  userImports: new Set()
}
