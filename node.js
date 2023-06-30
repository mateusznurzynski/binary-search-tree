const Node = (data = null, leftChild = null, rightChild = null) => {
  return {
    data,
    leftChild,
    rightChild,
  };
};

export { Node };
