import { mergeSort, removeDuplicates } from './utility.js';
import { Node } from './node.js';

const buildTree = (sortedArray, start = 0, end = sortedArray.length - 1) => {
  if (end < start) {
    return null;
  }

  const middle = parseInt((start + end) / 2);

  const treeNode = Node(
    sortedArray[middle],
    buildTree(sortedArray, start, middle - 1),
    buildTree(sortedArray, middle + 1, end)
  );

  return treeNode;
};

const initTree = (array) => {
  const cleanArray = removeDuplicates(array);
  const sortedArray = mergeSort(cleanArray);

  return buildTree(sortedArray);
};

const findReplacementNode = ({ node }, firstIteration = true, parentNode) => {
  if (firstIteration) {
    return findReplacementNode({ node: node.rightChild }, false, node);
  }
  if (node.leftChild) {
    return findReplacementNode({ node: node.leftChild }, false, node);
  } else {
    return { node, parentNode };
  }
};

const Tree = (array) => {
  return {
    root: initTree(array),

    insert(value, node = this.root) {
      if (!Number.isInteger(value)) {
        return false;
      }
      if (node === null) {
        return false;
      }
      if (node.data === value) {
        return false;
      }
      const newNode = Node(value);

      if (value > node.data) {
        if (node.rightChild !== null) {
          this.insert(value, node.rightChild);
        } else {
          node.rightChild = newNode;
        }
        //   this.insert(value, node.rightChild);
      } else {
        if (node.leftChild !== null) {
          this.insert(value, node.leftChild);
        } else {
          node.leftChild = newNode;
        }
        //   this.insert(value, node.leftChild);
      }
    },

    findNode(value, currentNode = this.root, parentNode) {
      if (currentNode === null) {
        return false;
      }
      if (currentNode.data === value) {
        return { node: currentNode, parentNode };
      }
      if (value > currentNode.data) {
        return this.findNode(value, currentNode.rightChild, currentNode);
      } else if (value < currentNode.data) {
        return this.findNode(value, currentNode.leftChild, currentNode);
      }
    },

    delete(value, node) {
      if (!value && !node) {
        return false;
      }
      const nodeToDelete = node ? node : this.findNode(value);
      if (
        (nodeToDelete.node.leftChild === null) &
        (nodeToDelete.node.rightChild === null)
      ) {
        // LEAF NODE
        if (nodeToDelete.node.data > nodeToDelete.parentNode.data) {
          nodeToDelete.parentNode.rightChild = null;
          return nodeToDelete.parentNode;
        } else {
          nodeToDelete.parentNode.leftChild = null;
          return nodeToDelete.parentNode;
        }
      } else if (
        nodeToDelete.node.leftChild !== null &&
        nodeToDelete.node.rightChild !== null
      ) {
        // TWO CHILDREN
        const replacementNode = findReplacementNode(nodeToDelete);
        this.delete(null, replacementNode);
        nodeToDelete.node.data = replacementNode.node.data;
      } else {
        // ONE CHILD
        if (nodeToDelete.node.data > nodeToDelete.parentNode.data) {
          nodeToDelete.parentNode.rightChild =
            nodeToDelete.node.rightChild || nodeToDelete.node.leftChild;
          return nodeToDelete.parentNode;
        } else {
          nodeToDelete.parentNode.leftChild =
            nodeToDelete.node.rightChild || nodeToDelete.node.leftChild;
          return nodeToDelete.parentNode;
        }
      }
    },
    levelOrder(callbackFunction) {
      let returnArray = false;
      if (!callbackFunction || typeof callbackFunction !== 'function') {
        returnArray = true;
      }

      const queue = [this.root];
      const resultArray = [];

      while (queue.length > 0) {
        const currentNode = queue[0];
        queue.shift();

        if (currentNode.leftChild) {
          queue.push(currentNode.leftChild);
        }
        if (currentNode.rightChild) {
          queue.push(currentNode.rightChild);
        }

        resultArray.push(currentNode.data);
        if (!returnArray) {
          callbackFunction(currentNode);
        }
      }

      if (returnArray) {
        return resultArray;
      }
    },
  };
};

export { Tree };
