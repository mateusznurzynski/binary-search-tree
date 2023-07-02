import { Tree } from './tree.js';

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

const testTree = Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

console.log(testTree.levelOrder());
console.log(testTree.preOrder());
console.log(testTree.inOrder());
console.log(testTree.postOrder());

printTree(testTree.root);
console.log(testTree.isBalanced());
