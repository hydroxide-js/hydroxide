import { commonPrefixOf } from './process'

/**
 * given the paths of nodes what we need to target,
 * it returns two arrays of domWalks
 *
 * first one is the domWalks that point to intermidiate nodes that we need to save
 * and the second is the domWalks that point to the final nodes that we need to target
 *
 * See the test suite to see how it works
 */
export function getOptimizedDomWalks(nodePaths: number[][]) {
  // geenerate the keys
  const domWalks = nodePaths.map(addressToDomWalk)
  // console.log(domWalks)

  const commonPrefixes: string[] = []

  // looper over the keys
  for (let i = 0; i < domWalks.length; i++) {
    // find minimum common prefix with length >= 2
    let commonPrefix = ''
    const indexesWithCommonPrefix = []
    for (let j = i + 1; j < domWalks.length; j++) {
      // if the keys are the same, add the key to the newNodeKeys
      const _commonPrefix = commonPrefixOf(domWalks[i], domWalks[j])
      if (_commonPrefix.length < 2) continue

      // if a same length prefix is matched
      if (_commonPrefix.length === commonPrefix.length) {
        // ignore if different
        if (_commonPrefix !== commonPrefix) {
          continue
        }
      }

      indexesWithCommonPrefix.push(j)

      if (
        commonPrefix.length === 0 ||
        _commonPrefix.length < commonPrefix.length
      ) {
        commonPrefix = _commonPrefix
      }
    }

    if (commonPrefix === '') continue

    indexesWithCommonPrefix.push(i)

    // save the common prefix
    commonPrefixes.push(commonPrefix)
    const commonPrefixIndex = commonPrefixes.length - 1

    // remove the common prefix from all the indexes with common prefix
    indexesWithCommonPrefix.forEach((index) => {
      domWalks[index] =
        commonPrefixIndex + domWalks[index].slice(commonPrefix.length)
    })

    // rerun this loop from start
    i = -1
  }

  // optimized keys
  return [commonPrefixes, domWalks]
}

/**
 * converts a index to domwalk
 *
 * Example:
 * `0 => "F"`
 * `3 => "FNNN"`
 */
export function indexToDomWalk(index: number) {
  let path = 'F'
  while (index--) path += 'N'
  return path
}

/**
 * converts an address to domWalk
 *
 * example: `[0, 1] => "RFFN"`
 */
export function addressToDomWalk(address: number[]) {
  return 'R' + address.map(indexToDomWalk).join('')
}
