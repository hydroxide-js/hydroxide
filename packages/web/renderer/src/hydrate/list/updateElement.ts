import { $, Path } from 'hydroxide'
import { ListInfo } from '../../types'
import { patchList } from './patch'

export function updateElement<T>(path: Path, value: T, listInfo: ListInfo<T>) {
  if (path.length > 1) {
    const [itemIndex, ...subPath] = path
    // @ts-expect-error
    const valueReactive = listInfo.parent.children[itemIndex as number].$$value
    // @ts-expect-error
    $(valueReactive, subPath).set(value)
  } else {
    patchList(listInfo)
  }
}
