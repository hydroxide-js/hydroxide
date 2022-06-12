type TupleOrSingle = [start: number, end?: number]
type Tuple = [start: number, end: number]

type Insert = {
  // insert either a value at single index or a range of values from newArry between given indexes
  // at insertAt index in oldArray
  indexes: TupleOrSingle
  insertAt: number
}

type Remove = {
  // remove count number of values from oldArray at index removeAt
  removeAt: number
  count: number
}

type Swap = {
  // swap the values in oldArray
  swap: Tuple
}

type Replace = {
  // replace the value at index currentIndex with the value from newIndex in newArray
  replace: [currentIndex: number, newIndex: number]
}

export type Action = Insert | Remove | Swap | Replace

// try to shrink the array by checking whether
// first elements are same
// last elements are same
// first and last elements are swapped
// first two elements are swapped
// last two elements are swapped

// and when all these methods fail to shrink the array
// use create map which maps the newValue to their index in the newArray
// then for each value in oldArray, check if is in the map
// if not - remove the element
// if it is - check whether it is better to insert values before it or replace value at that index in oldArray

export function reconcile<T>(oldArr: T[], newArr: T[]) {
  const actions: Action[] = []

  if (oldArr.length === 0) {
    actions.push({
      indexes: [0, newArr.length - 1],
      insertAt: 0
    })

    console.log('fast add ')
    return actions
  }

  if (newArr.length === 0) {
    actions.push({
      removeAt: 0,
      count: oldArr.length
    })

    console.log('fast remove ')
    return actions
  }

  // pointers
  let oldEnd = oldArr.length - 1
  let newEnd = newArr.length - 1
  let oldStart = 0
  let newStart = 0

  // newValue to newIndex map
  let newValueToIndexMap: Map<T, number> | undefined

  let removeCount = 0

  // while either one of the arrays is not traversed
  while (oldStart <= oldEnd || newStart <= newEnd) {
    // check if one of the array is fully traversed

    // if entire oldArr is traversed
    if (oldStart > oldEnd) {
      // insert the left over newArr elements
      actions.push({
        insertAt: newStart,
        indexes: newStart === newEnd ? [newStart] : [newStart, newEnd]
      })
      break
    }

    // if entire newArr is traversed
    else if (newStart > newEnd) {
      // remove the left over oldArr elements
      if (oldStart <= oldEnd) {
        actions.push({
          removeAt: oldStart - removeCount,
          count: oldEnd - oldStart + 1
        })
        removeCount++
      }
      break
    }

    // shrink array

    // if value at the start position is same, move start pointers forwards
    else if (oldArr[oldStart] === newArr[newStart]) {
      // shrink the oldArr and newArr by 1
      oldStart++
      newStart++
    }

    // if value at end position is same, move end pointers backwards
    else if (oldArr[oldEnd] === newArr[newEnd]) {
      // shrink the oldArr and newArr by 1
      oldEnd--
      newEnd--
    }

    // check whether the edges are swapped
    else if (
      oldArr[oldStart] === newArr[newEnd] &&
      newArr[newStart] === oldArr[oldEnd]
    ) {
      actions.push({
        swap: [oldStart, oldEnd]
      })

      oldStart++
      newStart++
      oldEnd--
      newEnd--
    }

    // check whether first two are swapped in oldArr
    else if (
      // if more two or more elements left to be processed
      oldStart + 1 <= oldEnd &&
      // and first two are swapped
      oldArr[oldStart] === newArr[newStart + 1] &&
      oldArr[oldStart + 1] === newArr[newStart]
    ) {
      actions.push({
        swap: [oldStart, oldStart + 1]
      })

      oldStart += 2
      newStart += 2
    }

    // check whether last two are swapped in oldArr
    else if (
      // if more two or more elements left to be processed
      oldStart + 1 <= oldEnd &&
      oldArr[oldEnd] === newArr[newEnd - 1] &&
      oldArr[oldEnd - 1] === newArr[newEnd]
    ) {
      // shrink the oldArr and newArr by 2
      actions.push({
        swap: [oldEnd, oldEnd - 1]
      })

      oldEnd -= 2
      newEnd -= 2
    }

    // if array can't be shrunk using above methods,
    // map based fallback
    else {
      // save the left over newArr elements in a map
      // the left over elements can be N in worst case if all the nodes are different or first and last items of the list are different

      if (!newValueToIndexMap) {
        newValueToIndexMap = new Map()
        for (let i = newStart; i <= newEnd; i++) {
          newValueToIndexMap.set(newArr[i], i)
        }
      }

      // if the value at position oldStart is in newArr ( not removed )
      if (newValueToIndexMap.has(oldArr[oldStart])) {
        const indexOfOldStartInNewArr = newValueToIndexMap.get(
          oldArr[oldStart]
        )!

        //  if the correct position of it lies in the shrunk array
        if (
          newStart <= indexOfOldStartInNewArr &&
          indexOfOldStartInNewArr <= newEnd
        ) {
          // length of sequenece of values that match in oldArr and newArr
          // after the eoldStart index
          let sequenceLength = 1

          for (let i = oldStart + 1; i <= oldEnd && i <= newEnd; i++) {
            if (
              newValueToIndexMap.get(oldArr[i]) ===
              indexOfOldStartInNewArr + sequenceLength
            ) {
              sequenceLength++
            } else {
              break
            }
          }

          // Example
          // a: [1, 2, 3, 4]
          // b: [7, 8, 1, 2, 3, 6]
          // number of inserts: 2, values found in new Arr: 4
          // so better to insert 2, instead of swapping 4

          // a: [1, 2, 3, 4]
          // b: [7, 8, 9, 1, 2]
          // here inserts required: 3, values found in new Arr: 2
          // so better to replace instead of insert

          const insertsRequired = indexOfOldStartInNewArr - newStart
          const replacesRequired = sequenceLength

          // console.log({ insertsRequired, replacesRequired })

          // if number of inserts is less than number of values found in newArr
          if (insertsRequired < replacesRequired) {
            const end = indexOfOldStartInNewArr - 1
            actions.push({
              indexes: newStart === end ? [newStart] : [newStart, end],
              insertAt: newStart
            })

            newStart = indexOfOldStartInNewArr
          }

          // else replace them with the new values
          else {
            actions.push({
              replace: [oldStart - removeCount, newStart]
            })

            newStart++
            oldStart++
          }
        }

        // ignore, because it's alraedy been dealt with
        else {
          oldStart++
        }
      }

      // else remove the value, because it's not in the newArr
      else {
        // do remove and then insert in next loop
        const prev = actions[actions.length - 1]
        if (
          actions.length > 0 &&
          'removeAt' in prev &&
          prev.removeAt + prev.count === oldStart
        ) {
          prev.count++
        } else {
          actions.push({
            removeAt: oldStart - removeCount,
            count: 1
          })
        }

        removeCount++
        oldStart++
      }
    }
  }

  return actions
}
