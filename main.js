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

const testTree = Tree([3, 2, 1, 5, 6, 8, 7, 7, 4, 9]);
testTree.delete(8);
testTree.delete(7);

console.log(testTree.levelOrder());
console.log(testTree.preOrder());
console.log(testTree.inOrder());
console.log(testTree.postOrder());

printTree(testTree.root);
console.log(testTree.height(testTree.root));
console.log(testTree.root);
