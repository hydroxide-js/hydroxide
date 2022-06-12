import { getOptimizedDomWalks } from '../src/utils/domWalker'

test('single path', () => {
  const walkerPaths = getOptimizedDomWalks([[0, 1, 2]])
  expect(walkerPaths).toEqual([
    [], // no extra
    ['FFNFNN']
  ])
})

test('two paths - 1', () => {
  const walkerPaths = getOptimizedDomWalks([
    [0, 1],
    [0, 2]
  ])
  expect(walkerPaths).toEqual([['FFN'], ['0', '0N']])
  /**
   * // [0, 1]
   * const node1 = root.firstChild.firstChild.nextSibling;
   * // [0, 2]
   * const node2 = node1.nextSibling;
   */
})

test.only('4 paths - 1', () => {
  const walkerPaths = getOptimizedDomWalks([[0, 1], [0, 2], [1, 1], [2]])
  expect(walkerPaths).toEqual([
    ['RF', '0FN', '0N'],
    ['1', '1N', '2FN', '2N']
  ])
  /**
   * // intermediates
   * const node0 = root.firstChild;
   * const node1 = node0.firstChild.nextSibling;
   * const node2 = node0.nextSibling;
   *
   * // needed
   * node1,
   * node1.nextSibling
   * node2.firstChild.nextSibling
   * node2.nextSibling
   *
   */
})

test.only('5 paths - 1', () => {
  const walkerPaths = getOptimizedDomWalks([
    [0, 1],
    [0, 2],
    [1, 1],
    [2],
    [4, 0],
    [5, 0]
  ])
  expect(walkerPaths).toEqual([
    ['RF', '0FN', '0N', '2N', '3NN'],
    ['1', '1N', '2FN', '3', '4F', '4NF']
  ])
  /**
   * // intermediates
   * const node0 = root.firstChild; // [0]
   * const node1 = node0.firstChild.nextSibling; [0, 1]
   * const node2 = node0.nextSibling; [1]
   * const node3 = node2.nextSibling; [2]
   * const node4 = node3.nextSibling.nextSibling; [4]
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
