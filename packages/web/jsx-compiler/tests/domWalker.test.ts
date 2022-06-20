import { getOptWalks } from '../src/utils/domWalker'

test('single path', () => {
  const targetNodePaths = [[0, 1, 2]]
  const walkerPaths = getOptWalks(targetNodePaths)
  expect(walkerPaths).toEqual([
    ['r.f.f.n.f.n.n'], // no extra
    ['0']
  ])

  // node1 = root.f.f.n.f.n.n
})

test('two paths', () => {
  const targetNodePaths = [
    [0, 1],
    [0, 2]
  ]

  const walkerPaths = getOptWalks(targetNodePaths)
  expect(walkerPaths).toEqual([
    ['r.f.f.n', '0.n'],
    ['0', '1']
  ])

  /**
   * // [0, 1]
   * const node1 = root.firstChild.firstChild.nextSibling;
   * // [0, 2]
   * const node2 = node1.nextSibling;
   */
})

test('4 paths', () => {
  const targetNodePaths = [[0, 1], [0, 2], [1, 1], [2]]
  const walkerPaths = getOptWalks(targetNodePaths)
  expect(walkerPaths).toEqual([
    ['r.f', '0.f.n', '1.n', '0.n', '3.f.n', '3.n'],
    ['1', '2', '4', '5']
  ])

  /**
   * // intermediates
   * const node0 = root.f; // [0]
   * const node1 = node0.f.n; // [0, 1]
   * const node2 = node1.n; // [0, 2]
   * const node3 = node0.n; // [1]
   * const node4 = node3.f.n; // [1, 1]
   * const node5 = node3.n; // [2]
   *
   * // target
   * node1, // [0, 1]
   * node2 // [0, 2]
   * node4 // [1, 1]
   * node5 // [2]
   *
   */
})

test('5 paths', () => {
  const walkerPaths = getOptWalks([[0, 1], [0, 2], [1, 1], [2], [4, 0], [5, 0]])
  expect(walkerPaths).toEqual([
    ['r.f', '0.f.n', '1.n', '0.n', '3.f.n', '3.n', '5.n.n', '6.f', '6.n.f'],
    ['1', '2', '4', '5', '7', '8']
  ])
  /**
   * // intermediates
   * const node0 = root.f; // [0]
   * const node1 = node0.f.n; [0, 1]
   * const node2 = node1.n; [0, 2]
   * const node3 = node0.n; [1]
   * const node4 = node3.f.n; [1, 1]
   * const node5 = node3.n; [2]
   * const node6 = node5.n.n [4]
   * const node7 = node6.f; [4, 0]
   * const node8 = node6.n.f; [5, 0]
   *
   * // needed
   * node1, // [0, 1]
   * node1.nextSibling // [0, 2]
   * node2.firstChild.nextSibling [1, 11]
   * node3, // [2]
   * node4.firstChild // [4, 0]
   * node4.nextSibling.firstChild [5, 0]
   *
   */
})

test('6 paths', () => {
  const walkerPaths = getOptWalks([[0, 1], [0, 2], [1, 1], [2], [4, 0], [5, 0]])
  expect(walkerPaths).toEqual([
    ['r.f', '0.f.n', '1.n', '0.n', '3.f.n', '3.n', '5.n.n', '6.f', '6.n.f'],
    ['1', '2', '4', '5', '7', '8']
  ])
  /**
   * // intermediates
   * const node0 = root.f; // [0]
   * const node1 = node0.f.n; [0, 1]
   * const node2 = node1.n; [0, 2]
   * const node3 = node0.n; [1]
   * const node4 = node3.f.n; [1, 1]
   * const node5 = node3.n; [2]
   * const node6 = node5.n.n [4]
   * const node7 = node6.f; [4, 0]
   * const node8 = node6.n.f; [5, 0]
   *
   * // needed
   * node1, // [0, 1]
   * node1.nextSibling // [0, 2]
   * node2.firstChild.nextSibling [1, 11]
   * node3, // [2]
   * node4.firstChild // [4, 0]
   * node4.nextSibling.firstChild [5, 0]
   *
   */
})

test('lot of paths', () => {
  const targetNodePaths = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5, 0],
    [2, 1],
    [2, 2],
    [2, 3],
    [2, 4],
    [2, 5, 0],
    [4, 1],
    [4, 2],
    [4, 3, 0]
  ]

  const [intWalks, targetWalks] = getOptWalks(targetNodePaths)

  expect(intWalks).toEqual([
    'r.f', // 0. [0]
    '0.f.n', // 1. [0, 1]
    '1.n', // 2. [0, 2]
    '2.n', // 3. [0, 3]
    '3.n', // 4. [0, 4]
    '4.n.f', // 5. [0, 5, 0]
    '0.n.n', // 6. [2]
    '6.f.n', // 7. [2, 1]
    '7.n', // 8. [2, 2]
    '8.n', // 9. [2, 3]
    '9.n', // 10. [2, 4]
    '10.n.f', // 11. [2, 5, 0]
    '6.n.n.f.n', // 12. [4, 1]
    '12.n', // 13. [4, 2]
    '13.n.f' // 14. [4, 3, 0]
  ])

  expect(targetWalks).toEqual([
    '1',
    '2',
    '3',
    '4',
    '5',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14'
  ])

  // n0 = r.f [0]
  // n1 = n0.f.n [0, 1]
  // n2 = n1.n [0, 2]
})
// test
