export type NodePath = number[]

export type TreeNode = {
  firstChild?: TreeNode
  nextSibling?: TreeNode
  isTarget?: true
  // optimized walk to reach this node
  optWalk?: string
  // if this node is saved as intNode, it is the index at which this node's optWalk is saved
  intIndex?: number
  // full walk to reach this node from root
  fullWalk: string
}

/**
 * converts a index to domWalk
 *
 * Example:
 * `0 => "F"`
 * `3 => "FNNN"`
 */
export function indexToDomWalk(index: number) {
  let path = '.f'
  for (let i = 0; i < index; i++) path += '.n'
  return path
}

/**
 * converts an address to domWalk
 *
 * example: `[0, 1] => "RFFN"`
 */
export function nodePathToDomWalk(address: number[]) {
  return 'r' + address.map(indexToDomWalk).join('')
}

const optWalkOf = (node: TreeNode) =>
  'intIndex' in node ? node.intIndex + '' : node.optWalk!

export function createTree(nodePaths: NodePath[]): TreeNode {
  // phase 1 create tree
  const tree: TreeNode = {
    optWalk: 'r',
    fullWalk: 'r'
  }

  nodePaths.forEach(nodePath => {
    // start with
    let target = tree

    // target
    nodePath.forEach(key => {
      for (let i = 0; i <= key; i++) {
        if (i === 0) {
          if (!target.firstChild) {
            target.firstChild = {
              fullWalk: target.fullWalk + '.f'
            }
          }
          target = target.firstChild
        } else {
          if (!target.nextSibling) {
            target.nextSibling = {
              fullWalk: target.fullWalk + '.n'
            }
          }
          target = target.nextSibling
        }
      }
    })

    target.isTarget = true
  })

  return tree
}

function getNodes(rootNode: TreeNode) {
  const intNodes: TreeNode[] = []
  const targetNodes: TreeNode[] = []

  function saveAsIntermediate(node: TreeNode) {
    // don't save if already saved
    if (!('intIndex' in node)) {
      intNodes.push(node)
      node.intIndex = intNodes.length - 1
    }
  }

  function visit(node: TreeNode, refParent: TreeNode) {
    let refParentNext = refParent

    // save a node as intermediate,
    // if its target node
    // or if node has both nextSibling and firstChild

    if (node.isTarget) {
      targetNodes.push(node)
      refParentNext = node
      saveAsIntermediate(node)
    } else if (node.firstChild && node.nextSibling) {
      refParentNext = node
      saveAsIntermediate(node)
    }

    const prefix = optWalkOf(node)

    if (node.firstChild) {
      node.firstChild.optWalk = prefix + '.f'
      visit(node.firstChild, refParentNext)
    }

    if (node.nextSibling) {
      node.nextSibling.optWalk = prefix + '.n'
      visit(node.nextSibling, refParentNext)
    }
  }

  visit(rootNode, rootNode)

  return [intNodes, targetNodes]
}

export function getOptWalks(targetNodePaths: NodePath[]) {
  const tree = createTree(targetNodePaths)
  const [intNodes, targetNodes] = getNodes(tree)

  // map full Walk to opt walk
  // so that we can find the opt walk for each targetNode
  const fullWalkToOptWalk: Record<string, string> = {}
  targetNodes.forEach(targetNode => {
    fullWalkToOptWalk[targetNode.fullWalk] = optWalkOf(targetNode)
  })

  const intOptWalks = intNodes.map(node => node.optWalk!)

  const targetOptWalks = targetNodePaths.map(targetNodePath => {
    // calculate the full walk for given target Node
    const fullWalk = nodePathToDomWalk(targetNodePath)
    // return the opt Walk
    return fullWalkToOptWalk[fullWalk]
  })

  return [intOptWalks, targetOptWalks]
}
