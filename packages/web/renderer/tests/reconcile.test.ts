import { Action, reconcile } from '../src/hydrate/list/reconcile'

// utility function to test whether applying actions on _arr will results in newArr or not
// newArr is passed as argument to take values from it for insertion
function applyActions(_arr: any[], newArr: any[], actions: Action[]) {
  const arr = [..._arr]

  for (const action of actions) {
    if ('insertAt' in action) {
      if (action.indexes.length === 1) {
        arr.splice(action.insertAt, 0, newArr[action.indexes[0]])
      } else {
        const [start, end] = action.indexes
        const values: any[] = []
        for (let i = start; i <= end!; i++) {
          values.push(newArr[i])
        }
        arr.splice(action.insertAt, 0, ...values)
      }
    }

    if ('removeAt' in action) {
      arr.splice(action.removeAt, action.count)
    }

    if ('swap' in action) {
      const [i, j] = action.swap
      const temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }

    if ('replace' in action) {
      arr[action.replace[0]] = newArr[action.replace[1]]
    }

    if ('clear' in action) {
      return []
    }
  }

  return arr
}

describe('insert ', () => {
  describe('insert single', () => {
    it('at the start', () => {
      const arr = [1, 2, 3]
      const newArr = [5, 1, 2, 3]
      const actions = reconcile(arr, newArr)
      expect(actions).toEqual([{ insertAt: 0, indexes: [0] }])
      expect(applyActions(arr, newArr, actions)).toEqual(newArr)
    })

    it('at the end', () => {
      const arr = [1, 2, 3]
      const newArr = [1, 2, 3, 4]
      const actions = reconcile(arr, newArr)
      expect(actions).toEqual([{ insertAt: 3, indexes: [3] }])
      expect(applyActions(arr, newArr, actions)).toEqual(newArr)
    })

    it('at the middle', () => {
      const arr = [1, 2, 3]
      const newArr = [1, 2, 4, 3]
      const actions = reconcile(arr, newArr)
      expect(actions).toEqual([{ insertAt: 2, indexes: [2] }])
      expect(applyActions(arr, newArr, actions)).toEqual(newArr)
    })
  })

  describe('insert multiple contiguous', () => {
    test('insert at end', () => {
      const oldArr = [1, 2, 3, 4]
      const newArr = [1, 2, 3, 4, 5, 6, 7, 8]

      const actions = reconcile(oldArr, newArr)

      expect(actions).toEqual([
        {
          insertAt: 4,
          indexes: [4, 7]
        }
      ])

      expect(applyActions(oldArr, newArr, actions)).toEqual(newArr)
    })

    test('insert at start', () => {
      const oldArr = [1, 2, 3, 4]
      const newArr = [5, 6, 7, 8, 1, 2, 3, 4]

      const actions = reconcile(oldArr, newArr)

      expect(actions).toEqual([
        {
          insertAt: 0,
          indexes: [0, 3]
        }
      ])

      expect(applyActions(oldArr, newArr, actions)).toEqual(newArr)
    })

    test('insert in the middle', () => {
      const oldArr = [1, 2, 3, 4]
      const newArr = [1, 2, 10, 20, 30, 3, 4]

      const actions = reconcile(oldArr, newArr)

      expect(actions).toEqual([
        {
          insertAt: 2,
          indexes: [2, 4]
        }
      ])

      expect(applyActions(oldArr, newArr, actions)).toEqual(newArr)
    })
  })

  describe('insert multiple distant', () => {
    test('not at the edges', () => {
      const oldArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const newArr = [1, 2, 100, 3, 4, 5, 200, 6, 7, 8, 300, 9, 10]

      const actions = reconcile(oldArr, newArr)

      // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

      expect(actions).toEqual([
        // [1, 2, 100, 3, 4, 5, 6, 7, 8, 9, 10]
        {
          insertAt: 2,
          indexes: [2]
        },
        // [1, 2, 100, 3, 4, 5, 200, 6, 7, 8, 9, 10]
        {
          insertAt: 6,
          indexes: [6]
        },
        // [1, 2, 100, 4, 5, 200, 6, 7, 8, 300, 9, 10,]
        {
          insertAt: 10,
          indexes: [10]
        }
      ])

      expect(applyActions(oldArr, newArr, actions)).toEqual(newArr)
    })

    test('including at the start edge', () => {
      const oldArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const newArr = [100, 1, 2, 200, 3, 4, 5, 300, 6, 7, 8, 9, 10]

      const actions = reconcile(oldArr, newArr)

      // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

      expect(actions).toEqual([
        // [100, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        {
          insertAt: 0,
          indexes: [0]
        },
        // [100, 1, 2, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        {
          insertAt: 3,
          indexes: [3]
        },
        // [100, 1, 2, 2, 3, 4, 5, 300, 6, 7, 8, 9, 10]
        {
          insertAt: 7,
          indexes: [7]
        }
      ])

      expect(applyActions(oldArr, newArr, actions)).toEqual(newArr)
    })

    test('including at the end edge', () => {
      const oldArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const newArr = [1, 2, 3, 4, 5, 100, 6, 7, 8, 9, 10, 200]

      const actions = reconcile(oldArr, newArr)

      // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

      expect(actions).toEqual([
        // [1, 2, 3, 4, 5, 100, 6, 7, 8, 9, 10]
        {
          insertAt: 5,
          indexes: [5]
        },
        // [1, 2, 3, 4, 5, 100, 6, 7, 8, 9, 10, 200]
        {
          insertAt: 11,
          indexes: [11]
        }
      ])

      expect(applyActions(oldArr, newArr, actions)).toEqual(newArr)
    })
  })
})

describe('remove', () => {
  describe('remove single', () => {
    it('at the start', () => {
      const arr = [1, 2, 3]
      const newArr = [2, 3]
      const actions = reconcile(arr, newArr)
      expect(actions).toEqual([{ removeAt: 0, count: 1 }])
      expect(applyActions(arr, newArr, actions)).toEqual(newArr)
    })

    it('at the end', () => {
      const arr = [1, 2, 3]
      const newArr = [1, 2]
      const actions = reconcile(arr, newArr)
      expect(actions).toEqual([{ removeAt: 2, count: 1 }])
      expect(applyActions(arr, newArr, actions)).toEqual(newArr)
    })

    it('at the middle', () => {
      const arr = [1, 2, 3]
      const newArr = [1, 3]
      const actions = reconcile(arr, newArr)
      expect(actions).toEqual([{ removeAt: 1, count: 1 }])
      expect(applyActions(arr, newArr, actions)).toEqual(newArr)
    })
  })

  describe('remove multiple distant', () => {
    test('including start edge', () => {
      const oldArr = [1, 2, 3, 4, 5, 6]
      // remove 1, 3, 5
      const newArr = [2, 4, 6]

      const actions = reconcile(oldArr, newArr)

      // [1, 2, 3, 4, 5, 6]
      expect(actions).toEqual([
        // [2, 3, 4, 5, 6]
        {
          removeAt: 0,
          count: 1
        },
        // [2, 4, 5, 6]
        {
          removeAt: 1,
          count: 1
        },
        // [2, 4, 6]
        {
          removeAt: 2,
          count: 1
        }
      ])

      expect(applyActions(oldArr, newArr, actions)).toEqual(newArr)
    })

    test('including end edge', () => {
      const oldArr = [1, 2, 3, 4, 5, 6]
      // remove 2 4 and 6
      const newArr = [1, 3, 5]

      const actions = reconcile(oldArr, newArr)

      // [1, 2, 3, 4, 5, 6]
      expect(actions).toEqual([
        // [1, 3, 4, 5, 6]
        {
          removeAt: 1,
          count: 1
        },
        // [1, 3, 5, 6]
        {
          removeAt: 2,
          count: 1
        },
        // [1, 3, 5]
        {
          removeAt: 3,
          count: 1
        }
      ])

      expect(applyActions(oldArr, newArr, actions)).toEqual(newArr)
    })
  })

  describe('remove multiple contiguous', () => {
    test('remove from the start', () => {
      const oldArr = [1, 2, 3, 4, 5, 6]
      const newArr = [4, 5, 6]

      const actions = reconcile(oldArr, newArr)

      expect(actions).toEqual([
        {
          removeAt: 0,
          count: 3
        }
      ])

      expect(applyActions(oldArr, newArr, actions)).toEqual(newArr)
    })

    test('remove from the end', () => {
      const oldArr = [1, 2, 3, 4, 5, 6]
      const newArr = [1, 2, 3]

      const actions = reconcile(oldArr, newArr)

      expect(actions).toEqual([
        {
          removeAt: 3,
          count: 3
        }
      ])

      expect(applyActions(oldArr, newArr, actions)).toEqual(newArr)
    })

    test('remove from the middle', () => {
      const oldArr = [1, 2, 3, 4, 5, 6]
      const newArr = [1, 5, 6]

      const actions = reconcile(oldArr, newArr)

      expect(actions).toEqual([
        {
          removeAt: 1,
          count: 3
        }
      ])

      expect(applyActions(oldArr, newArr, actions)).toEqual(newArr)
    })

    it('remove all', () => {
      const arr = [1, 2, 3]
      const newArr = [] as number[]
      const actions = reconcile(arr, newArr)
      expect(actions).toEqual([{ clear: true }])
      expect(applyActions(arr, newArr, actions)).toEqual(newArr)
    })
  })
})

describe('swap', () => {
  describe('swap single', () => {
    test('swap at the start', () => {
      const oldArr = [1, 2, 3, 4, 5, 6]
      const newArr = [2, 1, 3, 4, 5, 6]

      const actions = reconcile(oldArr, newArr)

      expect(actions).toEqual([
        {
          swap: [0, 1]
        }
      ])

      expect(applyActions(oldArr, newArr, actions)).toEqual(newArr)
    })

    test('swap at the end', () => {
      const oldArr = [1, 2, 3, 4, 5, 6]
      const newArr = [1, 2, 3, 4, 6, 5]

      const actions = reconcile(oldArr, newArr)

      expect(actions).toEqual([
        {
          swap: [4, 5]
        }
      ])

      expect(applyActions(oldArr, newArr, actions)).toEqual(newArr)
    })

    test('swap in the middle', () => {
      const oldArr = [1, 2, 3, 4, 5, 6]
      const newArr = [1, 2, 4, 3, 5, 6]

      const actions = reconcile(oldArr, newArr)

      expect(actions).toEqual([
        {
          swap: [2, 3]
        }
      ])

      expect(applyActions(oldArr, newArr, actions)).toEqual(newArr)
    })
  })

  describe('swap multiple', () => {
    test('including at the start', () => {
      const oldArr = [1, 2, 3, 4, 5, 6]
      const newArr = [2, 1, 3, 5, 4, 6]
      const actions = reconcile(oldArr, newArr)
      expect(actions).toEqual([{ swap: [0, 1] }, { swap: [3, 4] }])
      expect(applyActions(oldArr, newArr, actions)).toEqual(newArr)
    })

    test('swap at the end', () => {
      const oldArr = [1, 2, 3, 4, 5, 6]
      const newArr = [1, 2, 3, 4, 6, 5]
      const actions = reconcile(oldArr, newArr)
      expect(actions).toEqual([{ swap: [4, 5] }])
      expect(applyActions(oldArr, newArr, actions)).toEqual(newArr)
    })

    test('swap in the middle', () => {
      const oldArr = [1, 2, 3, 4, 5, 6]
      const newArr = [1, 3, 2, 5, 4, 6]
      const actions = reconcile(oldArr, newArr)
      expect(actions).toEqual([{ swap: [1, 2] }, { swap: [3, 4] }])
      expect(applyActions(oldArr, newArr, actions)).toEqual(newArr)
    })
  })
})

describe('insert + remove multiple', () => {
  test('insert at end + remove from start', () => {
    const oldArr = [1, 2, 3, 4]
    const newArr = [3, 4, 5, 6, 7, 8]

    const actions = reconcile(oldArr, newArr)

    // [1, 2, 3, 4]

    expect(actions).toEqual([
      // [3, 4]
      {
        removeAt: 0,
        count: 2
      },
      // [3, 4, 5, 6, 7, 8]
      {
        insertAt: 2,
        indexes: [2, 5]
      }
    ])

    // [1, 2, 3, 4]
    // [3, 4, 3, 4]
    // [3, 4, 5, 6, 7, 8, 3, 4]
    // expect(actions).toEqual([
    //   { replace: [0, 0] },
    //   { replace: [1, 1] },
    //   { insertAt: 2, indexes: [2, 5] }
    // ])

    expect(applyActions(oldArr, newArr, actions)).toEqual(newArr)
  })

  test('insert at start + remove from end', () => {
    const oldArr = [1, 2, 3, 4]
    const newArr = [10, 20, 30, 1, 2]

    const actions = reconcile(oldArr, newArr)

    // [1, 2, 3, 4]
    expect(actions).toEqual([
      // [10, 2, 3, 4]
      {
        replace: [0, 0]
      },
      // [10, 20, 3, 4]
      {
        replace: [1, 1]
      },
      // [10, 20]
      {
        count: 2,
        removeAt: 2
      },
      // [10, 20, 30, 1, 2]
      {
        indexes: [2, 4],
        insertAt: 2
      }
    ])

    expect(applyActions(oldArr, newArr, actions)).toEqual(newArr)
  })

  test('insert at start + remove from middle', () => {
    const oldArr = [1, 2, 3, 4, 5, 6, 7, 8]
    const newArr = [10, 20, 1, 5, 6, 7, 8]
    const actions = reconcile(oldArr, newArr)

    // [1, 2, 3, 4, 5, 6, 7, 8]
    expect(actions).toEqual([
      // [10, 2, 3, 4, 5, 6, 7, 8]
      {
        replace: [0, 0]
      },
      // [10, 5, 6, 7, 8]
      {
        count: 3,
        removeAt: 1
      },
      // [10, 20, 1, 5, 6, 7, 8]
      {
        indexes: [1, 2],
        insertAt: 1
      }
    ])

    expect(applyActions(oldArr, newArr, actions)).toEqual(newArr)
  })
})

test('completely new set', () => {
  const oldArr = [1, 2, 3, 4, 5, 6]
  const newArr = [10, 20, 30, 40, 50, 60]

  const actions = reconcile(oldArr, newArr)

  expect(actions).toEqual([
    // remove all
    {
      removeAt: 0,
      count: 6
    },
    // add all new
    {
      insertAt: 0,
      indexes: [0, 5]
    }
  ])

  expect(applyActions(oldArr, newArr, actions)).toEqual(newArr)
})

test('almost all values changed', () => {
  const oldArr = [1, 2, 3, 4, 5, 6]
  const newArr = [10, 20, 30, 5, 1]

  const actions = reconcile(oldArr, newArr)

  // [1, 2, 3, 4, 5, 6]

  // replace item at index 1 with item at index 4 in new
  expect(actions).toEqual([
    // [10, 2, 3, 4, 5, 6]
    {
      replace: [0, 0]
    },
    // [10, 5, 6]
    {
      count: 3,
      removeAt: 1
    },
    // [10, 20, 6]
    {
      replace: [1, 1]
    },
    // [10, 20]
    {
      count: 1,
      removeAt: 2
    },
    // [10, 20, 30, 5, 1]
    {
      indexes: [2, 4],
      insertAt: 2
    }
  ])

  expect(applyActions(oldArr, newArr, actions)).toEqual(newArr)
})

test('no change', () => {
  const oldArr = [1, 2, 3, 4, 5, 6]
  const newArr = [1, 2, 3, 4, 5, 6]

  const actions = reconcile(oldArr, newArr)

  // [1, 2, 3, 4, 5, 6]

  // replace item at index 1 with item at index 4 in new
  expect(actions).toEqual([])
})

test('reverse', () => {
  const oldArr = [1, 2, 3, 4, 5]
  const newArr = [5, 4, 3, 2, 1]

  const actions = reconcile(oldArr, newArr)

  // [1, 2, 3, 4, 5, 6]

  // replace item at index 1 with item at index 4 in new
  expect(actions).toEqual([
    // [10, 2, 3, 4, 5, 6]
    {
      swap: [0, 4]
    },
    {
      swap: [1, 3]
    }
  ])

  expect(applyActions(oldArr, newArr, actions)).toEqual(newArr)
})

test('empty to add all', () => {
  const oldArr: number[] = []
  const newArr = [5, 4, 3, 2, 1]

  const actions = reconcile(oldArr, newArr)

  // [1, 2, 3, 4, 5, 6]

  // replace item at index 1 with item at index 4 in new
  expect(actions).toEqual([
    // [10, 2, 3, 4, 5, 6]
    {
      insertAt: 0,
      indexes: [0, 4]
    }
  ])

  expect(applyActions(oldArr, newArr, actions)).toEqual(newArr)
})
