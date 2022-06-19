import { invalidate, Path } from 'hydroxide'
import { ListInfo } from '../../types'
import { patchList } from './patch'

export function updateElement<T>(
  path: Path | null,
  value: any,
  listInfo: ListInfo<T>
) {
  if (path && path.length > 1) {
    const reactive = listInfo.list[path[0] as number].value

    // @ts-ignore
    // $(reactive, path.slice(1)).set(value)

    let target = reactive.value
    const lastIndex = path.length - 1

    for (let i = 1; i < lastIndex; i++) {
      // @ts-expect-error
      target = target[path[i]]
    }
    // @ts-expect-error
    target[path[lastIndex]] = value

    invalidate(reactive)
  } else {
    patchList(listInfo)
  }
}
