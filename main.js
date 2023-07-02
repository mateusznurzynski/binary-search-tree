import { Tree } from './tree.js';
import { getRandomNumber } from './utility.js';

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

const generateTreeInput = (inputSize) => {
  const input = [];
  for (let i = 0; i < inputSize; i++) {
    input.push(getRandomNumber(1, 99));
  }
  return input;
};

const normalInput = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const testTree = Tree(normalInput);
testTree.delete(6);

console.log(testTree.isBalanced());
console.log(testTree.rebalance());
console.log(testTree.isBalanced());

printTree(testTree.root);
