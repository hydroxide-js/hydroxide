import { globalInfo } from '../globalInfo'
import { Props } from '../types'

export function useProps<T>(): Props<T> {
  // @ts-ignore
  return globalInfo.context?.$props
}
