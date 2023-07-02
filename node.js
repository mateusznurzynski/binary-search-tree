const Node = (
  data = null,
  leftChild = null,
  rightChild = null,
  parentNode = null
) => {
  return {
    data,
    leftChild,
    rightChild,
    parentNode,
  };
};

export { Node };
