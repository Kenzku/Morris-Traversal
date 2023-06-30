/**
 * Created by Kenzku (aka ken) on 30/06/2023.
 *
 * Ref: https://leetcode.com/problems/binary-tree-inorder-traversal/editorial/
 */
/**
 * Morris Traversal
 * Step 1: Initialize current_node as root, result = []
 *
 * Step 2: While current_node is not NULL,
 *
 * while (current_node)
 *
 *   if the current_node does not have left child
 *
 *     a. add the current_node's value i.e. result.push[current_node.val]
 *
 *     b. set the current_node to its right child i.e. current_node = current_node.right
 *
 *   else
 *
 *     a. In the current_node's left subtree, find its rightmost node, node A
 *     set the current_node as the right child of the node A
 *     (now the node A becomes the immediate predecessor of the current_node, where the predecessor means a parent node)
 *
 *     i.e.
 *     let A = current_node.left <---- In the current_node's left subtree
 *     while (A.right)
 *       A = A.right
 *     A.right = current_node
 *
 *
 *     Note: this tree now might be like a graph -> so we need step c
 *
 *     b. set the current_node to a temp_node, i.e. temp_node = current_node;
 *     set the current_node to its left child. i.e.  current_node = current_node.left
 *
 *     c. remove the temp_node's left link, i.e. temp_node.left = null
 *     (this is to remove the original current_node's link, to prevent infinite loops)
 *
 * Step 3: return result
 */

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

/**
 * Morris Traversal
 * @param root
 * @returns {*[]}
 */
let inorderTraversal = (root) => {
  let results = []
  let current_node = root;

  while (current_node) {
    if (current_node.left === null) {
      results.push(current_node.val);
      current_node = current_node.right;
    } else {
      let A = current_node.left;
      while (A.right) {
        A = A.right;
      }
      A.right = current_node

      let temp_node = current_node;
      current_node = current_node.left;

      temp_node.left = null;
    }
  }

  return results;
}

/**
 * Step-by-Step guide:
 *
 *           1
 *         /   \
 *        2     3
 *       / \   /
 *      4   5 6
 *
 *  In the left subtree, find the rightmost node, i.e. A(5)
 *
 *          2
 *         / \
 *        4   5
 *
 *  set the current_node(1) as A(5)'s right child
 *  at this point, current_node(1)'s left child is still node(2)
 *           2
 *         /| \
 *        4 |  5
 *          |   \
 *          |--- 1
 *               \
 *                3
 *               /
 *              6
 *  set the temp_node to the current_node(1)
 *  update current_node to current_node(1)'s left child, i.e. the node(2)
 *  now current_node is 2 i.e. current_node(2)
 *  remove the node(1)'s left link i.e. temp_node.left = null
 *
 *
 *          2
 *         / \
 *        4   5
 *             \
 *              1
 *               \
 *                3
 *               /
 *              6
 *
 *  continue the while loop, as current_node(2), has left child,
 *  In the left subtree, find the rightmost node, since node(4) has no children, so A is 4.
 *
 *             4     <--- the subtree
 *
 *  set the current_node(2) as A(4)'s right child
 *  at this point, current_node(2)'s left child is still node(4)
 *
 *          4
 *         | \
 *         |--2
 *            \
 *             5
 *              \
 *               1
 *                \
 *                 3
 *                /
 *               6
 *
 *  use the temp_node to remove the link
 *
 *  now current_node is 4 i.e. current_node(4)
 *
 *          4
 *          \
 *           2
 *            \
 *             5
 *              \
 *               1
 *                \
 *                 3
 *                /
 *               6
 *  since current_node(4) has no left child,
 *  so results.push(4) <--- [4]
 *  update the current_node to current_node(4)'s right child, i.e. current_node(2)
 *
 *          4
 *          \
 *           2  <--- current_node(2)
 *            \
 *             5
 *              \
 *               1
 *                \
 *                 3
 *                /
 *               6
 *
 *  since current_node(2) has no left child,
 *  so results.push(2) <--- [4, 2]
 *  repeat to node(3) <---- [4, 2, 5 ,1]
 *
 *                 3 <--- current_node(3)
 *                /
 *               6
 *
 *  current_node(3) has left child, so look at the left subtree
 *  In the left subtree,
 *
 *         6   <--- the subtree
 *
 *  find node(4)'s rightmost child, as it does not have children, the A is 6
 *  set the current_node(3) to A(6)'s right child
 *
 *         4
 *          \
 *           2
 *            \
 *             5
 *              \
 *               1
 *                \
 *            6 -- 3 <--- current_node(3)
 *                /  <--- to be removed
 *               6   <--- this node(6) is the same (only one node(6) )
 *
 * at this point, current_node(3)'s left child is still node(6)
 * so we use the temp_node to remove this link:
 * set the temp_node to the current_node(3) <-- do NOT remove the link yet
 * update current_node to current_node(3)'s left child, i.e. the node(6)
 * now current_node is 6 i.e. current_node(6)
 * remove the node(3)'s left link i.e. temp_node.left = null
 *
 *         4
 *          \
 *           2
 *            \
 *             5
 *              \
 *               1
 *                \
 *                 6  <--- current_node(6)
 *                  \
 *               6   3 <--- NOTE:there is only one node(6), just to visualise the left child of node(3) is gone
 *
 * since current_node(6) has no left child,
 * so results.push(6) <--- [4, 2, 5, 1, 6]
 * repeat to node(3) <---- [4, 2, 5 ,1, 6, 3]
 */