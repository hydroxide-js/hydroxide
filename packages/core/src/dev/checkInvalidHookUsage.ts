import { coreInfo } from '../index'

/** a hook must be used inside a context */
export function checkInvalidHookUsage(hookName: string) {
  if (!coreInfo.context) {
    throw new Error(
      `Invalid Hook Usage: Can not use ${hookName}() hook outside of a component`
    )
  }
}
