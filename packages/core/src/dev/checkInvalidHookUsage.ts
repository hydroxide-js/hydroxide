import { globalInfo } from '../index'

/** a hook must be used inside a context */
export function checkInvalidHookUsage(hookName: string) {
  if (!globalInfo.context) {
    throw new Error(
      `Invalid Hook Usage: Can not use ${hookName}() hook outside of a component`
    )
  }
}
