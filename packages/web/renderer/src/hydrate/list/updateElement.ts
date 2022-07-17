import { invalidate, GenericPath } from 'hydroxide'
import { ListInfo } from '../../types'
import { patchList } from './patch'

export function updateElement<T>(
  path: GenericPath | null,
  value: any,
  listInfo: ListInfo<T>
) {
  if (path && path.length > 1) {
    const reactive = listInfo.list[path[0] as number].value
    if (!reactive.mutable) {
      // @ts-ignore
      reactive(path.slice(1)).set(value)
    } else {
      // faster path
      let target = reactive.value
      const lastIndex = path.length - 1
      for (let i = 1; i < lastIndex; i++) {
        // @ts-expect-error
        target = target[path[i]]
      }
      // @ts-expect-error
      target[lastIndex] = value
      invalidate(reactive)
    }
  } else {
    patchList(listInfo)
  }
}
