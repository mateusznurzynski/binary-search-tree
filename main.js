const mergeSort = function mergeSort(array) {
  if (array.length < 2) {
    return array;
  }

  const leftHalf = array.slice(0, parseInt(array.length / 2));
  const rightHalf = array.slice(parseInt(array.length / 2), array.length);

  const leftSorted = mergeSort(leftHalf);
  const rightSorted = mergeSort(rightHalf);

  const leftSortedLength = leftSorted.length;
  const rightSortedLength = rightSorted.length;
  const totalLength = leftSortedLength + rightSortedLength;

  let leftIndex = 0;
  let rightIndex = 0;

  const resultArray = [];

  while (resultArray.length < totalLength) {
    if (leftIndex + 1 > leftSortedLength) {
      resultArray.push(rightSorted[rightIndex++]);
    } else if (rightIndex + 1 > rightSortedLength) {
      resultArray.push(leftSorted[leftIndex++]);
    } else if (leftSorted[leftIndex] < rightSorted[rightIndex]) {
      resultArray.push(leftSorted[leftIndex++]);
    } else {
      resultArray.push(rightSorted[rightIndex++]);
    }
  }

  return resultArray;
};

const removeDuplicates = (array) => {
  const lookupTable = {};
  const cleanArray = array.filter((element) => {
    if (lookupTable[element]) {
      return false;
    } else {
      lookupTable[element] = true;
      return true;
    }
  });
  return cleanArray;
};

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

const Node = (data = null, leftChild = null, rightChild = null) => {
  return {
    data,
    leftChild,
    rightChild,
  };
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
    },
  };
};

const printTree = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.rightChild !== null) {
    printTree(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.leftChild !== null) {
    printTree(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

const testTree = Tree([3, 2, 1, 5, 6, 8, 7, 7, 9]);
testTree.insert(4, testTree.root);
printTree(testTree.root);
console.log(testTree.findNode(8));
