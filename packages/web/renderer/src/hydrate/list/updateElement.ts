import { GenericPath } from 'hydroxide'
import { ListInfo } from '../../types'
import { patchList } from './patch'

export function updateElement<T>(
  path: GenericPath | null,
  value: any,
  listInfo: ListInfo<T>
) {
  if (path && path.length > 1) {
    const reactive = listInfo.list[path[0] as number].value
    // @ts-ignore
    reactive(...path.slice(1)).set(value)
  } else {
    patchList(listInfo)
  }
}
