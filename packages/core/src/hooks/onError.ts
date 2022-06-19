import { checkInvalidHookUsage } from '../dev/checkInvalidHookUsage'
import { globalInfo } from '../index'

export function onError(handleError: (error: any) => void) {
  checkInvalidHookUsage('onError')

  if (globalInfo.context!.onError) {
    globalInfo.context!.onError.push(handleError)
  } else {
    globalInfo.context!.onError = [handleError]
  }
}
