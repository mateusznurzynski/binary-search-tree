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

const generateTreeInput = (inputSize, min = 1, max = 99) => {
  const input = [];
  for (let i = 0; i < inputSize; i++) {
    input.push(getRandomNumber(min, max));
  }
  return input;
};

const additionalInput = generateTreeInput(10, 100, 200);

const testTree = Tree(generateTreeInput(20));

console.log(testTree.isBalanced());
console.log(testTree.preOrder());
console.log(testTree.inOrder());
console.log(testTree.postOrder());
additionalInput.forEach((element) => {
  testTree.insert(element);
});
console.log(testTree.isBalanced());
testTree.rebalance();
console.log(testTree.isBalanced());
console.log(testTree.preOrder());
console.log(testTree.inOrder());
console.log(testTree.postOrder());

printTree(testTree.root);
