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

const buildTree = (array) => {
  const cleanArray = removeDuplicates(array);
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
    root: buildTree(array),
  };
};
