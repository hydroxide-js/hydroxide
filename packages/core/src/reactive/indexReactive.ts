// import { globalInfo } from '../context/globalInfo'
// import { Store } from '../types/store'
// import { Reactive } from './reactive'
// import { ReactiveList } from './reactiveList'

// export function correctIndexOf(arr: ReactiveList<any>, index: IndexReactive) {
//   const currentValue = index._.store.value

//   // ignore if item is already having the latest index
//   if (index.flush === arr.flush) {
//     return currentValue
//   }

//   let modified = currentValue
//   arr.mutations.forEach((mutation) => {
//     // ignore mutations that happened before index was updated
//     if (mutation.flush < index.flush) return
//     if (mutation.i <= modified) {
//       if (mutation.op === 'delete') modified -= mutation.count
//       else modified += mutation.count
//     }
//   })

//   // return original if modified goes negative
//   const ans = modified < 0 ? currentValue : modified

//   // update flush of index so that next time we don't have to do this again??

//   return ans
// }

// /** index reactive provides on demand correct index based on mutation methods done on array  */
// /** it will become slow as number of mutation methods done on array keep increasing  */
// export class IndexReactive extends Reactive {
//   list: ReactiveList<any>
//   flush: number

//   constructor(initIndex: number, reactiveList: ReactiveList<any>) {
//     const store: Store = {
//       value: initIndex,
//       dirty: {},
//       subs: {},
//       slices: {},
//       context: globalInfo.context
//     }

//     super(store, [])

//     this.list = reactiveList
//     this.flush = reactiveList.flush
//   }

//   // modify the value so that it always returns the correct value of index
//   get value() {
//     return correctIndexOf(this.list, this)
//   }
// }
