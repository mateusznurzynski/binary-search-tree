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

const testTree = Tree([3, 2, 1, 5, 4, 6, 8, 7, 7, 9]);
printTree(testTree.root);
