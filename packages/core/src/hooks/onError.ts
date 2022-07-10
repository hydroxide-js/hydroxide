import { checkInvalidHookUsage } from '../dev/checkInvalidHookUsage'
import { coreInfo } from '../index'

export function onError(handleError: (error: any) => void) {
  checkInvalidHookUsage('onError')

  if (coreInfo.context!.onError) {
    coreInfo.context!.onError.push(handleError)
  } else {
    coreInfo.context!.onError = [handleError]
  }
}
