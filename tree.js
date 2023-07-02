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
  if (treeNode.leftChild) {
    treeNode.leftChild.parentNode = treeNode;
  }
  if (treeNode.rightChild) {
    treeNode.rightChild.parentNode = treeNode;
  }

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
          const newNode =
            nodeToDelete.node.rightChild || nodeToDelete.node.leftChild;
          nodeToDelete.parentNode.rightChild = newNode;
          newNode.parentNode = nodeToDelete.parentNode;
          return nodeToDelete.parentNode;
        } else {
          const newNode =
            nodeToDelete.node.rightChild || nodeToDelete.node.leftChild;
          nodeToDelete.parentNode.leftChild = newNode;
          newNode.parentNode = nodeToDelete.parentNode;
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

    preOrder(callbackFunction, currentNode = this.root, resultArray = []) {
      let returnArray = false;
      if (!callbackFunction || typeof callbackFunction !== 'function') {
        returnArray = true;
      }

      resultArray.push(currentNode.data);
      if (!returnArray) {
        callbackFunction(currentNode);
      }

      let returnedArray = [];

      if (currentNode.leftChild) {
        returnedArray = this.preOrder(
          callbackFunction,
          currentNode.leftChild,
          resultArray
        );
      }
      if (currentNode.rightChild) {
        returnedArray = this.preOrder(
          callbackFunction,
          currentNode.rightChild,
          resultArray
        );
      }

      if (returnArray) {
        return resultArray;
      }
    },

    inOrder(callbackFunction, currentNode = this.root, resultArray = []) {
      let returnArray = false;
      if (!callbackFunction || typeof callbackFunction !== 'function') {
        returnArray = true;
      }
      let returnedArray = [];

      if (currentNode.leftChild) {
        returnedArray = this.inOrder(
          callbackFunction,
          currentNode.leftChild,
          resultArray
        );
      }

      resultArray.push(currentNode.data);
      if (!returnArray) {
        callbackFunction(currentNode);
      }

      if (currentNode.rightChild) {
        returnedArray = this.inOrder(
          callbackFunction,
          currentNode.rightChild,
          resultArray
        );
      }

      if (returnArray) {
        return resultArray;
      }
    },

    postOrder(callbackFunction, currentNode = this.root, resultArray = []) {
      let returnArray = false;
      if (!callbackFunction || typeof callbackFunction !== 'function') {
        returnArray = true;
      }
      let returnedArray = [];

      if (currentNode.leftChild) {
        returnedArray = this.postOrder(
          callbackFunction,
          currentNode.leftChild,
          resultArray
        );
      }

      if (currentNode.rightChild) {
        returnedArray = this.postOrder(
          callbackFunction,
          currentNode.rightChild,
          resultArray
        );
      }

      resultArray.push(currentNode.data);
      if (!returnArray) {
        callbackFunction(currentNode);
      }

      if (returnArray) {
        return resultArray;
      }
    },

    height(node, height = 0) {
      if (node === null) {
        return height;
      }
      if (node.leftChild === null && node.rightChild === null) {
        return height + 1;
      }
      height++;

      const leftHeight = this.height(node.leftChild, height);
      const rightHeight = this.height(node.rightChild, height);

      if (leftHeight >= rightHeight) {
        return leftHeight;
      } else {
        return rightHeight;
      }
    },

    depth(node) {
      let depth = 0;
      while (node !== null) {
        depth++;
        node = node.parentNode;
      }
      return depth;
    },

    isBalanced(node = this.root) {
      let isBalanced = true;
      this.levelOrder((node) => {
        let difference = 0;
        const leftHeight = this.height(node.leftChild);
        const rightHeight = this.height(node.rightChild);
        difference = leftHeight - rightHeight;
        difference = difference < 0 ? difference * -1 : difference;
        if (difference > 1) {
          isBalanced = false;
          return isBalanced;
        }
      });
      return isBalanced;
    },

    rebalance() {
      const newInput = this.inOrder();
      this.root = buildTree(newInput);
      return newInput;
    },
  };
};

export { Tree };
