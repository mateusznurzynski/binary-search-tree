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

const testTree = Tree(generateTreeInput(50));

console.log(testTree.levelOrder());
console.log(testTree.preOrder());
console.log(testTree.inOrder());
console.log(testTree.postOrder());

printTree(testTree.root);
console.log(testTree.isBalanced());
