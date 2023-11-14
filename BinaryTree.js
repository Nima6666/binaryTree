/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */

const Node = require("./NodeClass");

class Tree {
  constructor(node) {
    this.root = node;
  }

  insert(value) {
    let currentRoot = this.root;
    const isNotLeaf = true;
    const nodeToAdd = new Node(value);
    let parentElem;
    while (isNotLeaf) {
      if (value == currentRoot.data) return console.log("Data already Exists");
      if (value < currentRoot.data) {
        parentElem = currentRoot;
        currentRoot = currentRoot.left;
      } else {
        parentElem = currentRoot;
        currentRoot = currentRoot.right;
      }
      if (currentRoot == null) {
        if (value < parentElem.data) {
          parentElem.left = nodeToAdd;
        } else {
          parentElem.right = nodeToAdd;
        }
        return nodeToAdd;
      }
    }
    return nodeToAdd;
  }

  find(value) {
    let parentNode = null;
    function recursiveFind(currentRoot) {
      if (currentRoot == null) {
        console.log("the given data doesnt exist");
        return { currentRoot: null, parentNode: null };
      }
      if (currentRoot.data == value) {
        console.log("Found", currentRoot);
        return { currentRoot, parentNode };
      }
      if (currentRoot.data < value) {
        parentNode = currentRoot;
        return recursiveFind(currentRoot.right);
      }
      parentNode = currentRoot;
      return recursiveFind(currentRoot.left);
    }
    const currentRoot = this.root;
    return recursiveFind(currentRoot);
  }

  delete(value) {
    const data = this.find(value);
    const node = data.currentRoot;
    const parentOfDeletedNode = data.parentNode;
    let parentOfReplacingNode = node;
    if (node === null) {
      return;
    }
    if (node.right == null && node.left == null) {
      if (parentOfDeletedNode.data < node.data) {
        parentOfDeletedNode.right = null;
      } else {
        parentOfDeletedNode.left = null;
      }
      return;
    }
    function toSearchForReplacingNode(nodeReplacer) {
      if (nodeReplacer == null || nodeReplacer.left == null) {
        return nodeReplacer;
      }
      parentOfReplacingNode = nodeReplacer;
      return toSearchForReplacingNode(nodeReplacer.left);
    }
    // if parent node dosent have right element
    if (node.right == null) {
      if (parentOfDeletedNode.data < node.data) {
        parentOfDeletedNode.right = node.left;
      } else {
        parentOfDeletedNode.left = node.left;
      }
      return;
    }
    let replacingNode = node.right;
    replacingNode = toSearchForReplacingNode(replacingNode);
    if (parentOfReplacingNode.data == node.data) {
      if (parentOfDeletedNode.data > node.data) {
        parentOfDeletedNode.right = replacingNode;
      } else {
        parentOfDeletedNode.left = replacingNode;
      }
      replacingNode.left = node.left;
      return;
    }
    parentOfReplacingNode.left = replacingNode.right;
    replacingNode.right = node.right;
    replacingNode.left = node.left;
    if (parentOfDeletedNode === null) {
      this.root = replacingNode;
      return;
    }
    if (parentOfDeletedNode.data > value) {
      parentOfDeletedNode.left = replacingNode;
    } else {
      parentOfDeletedNode.right = replacingNode;
    }
  }

  levelOrder() {
    const que = [];
    const output = [];
    que.push(this.root);
    while (que.length) {
      output.push(que[0].data);
      if (que[0].left != null) {
        que.push(que[0].left);
      }
      if (que[0].right != null) {
        que.push(que[0].right);
      }
      que.shift();
    }
    console.log(output);
  }

  inorder() {
    const output = [];
    const recursiveInorder = (root) => {
      if (root === null) {
        return;
      }
      recursiveInorder(root.left);
      output.push(root.data);
      recursiveInorder(root.right);
    };
    recursiveInorder(this.root);
    console.log(output);
    return output;
  }

  preorder() {
    const output = [];
    const recursivePreorder = (root) => {
      if (root === null) {
        return;
      }
      output.push(root.data);
      recursivePreorder(root.left);
      recursivePreorder(root.right);
    };
    recursivePreorder(this.root);
    console.log(output);
  }

  postorder() {
    const output = [];
    const recursivePostorder = (root) => {
      if (root === null) {
        return;
      }
      recursivePostorder(root.left);
      recursivePostorder(root.right);
      output.push(root.data);
    };
    recursivePostorder(this.root);
    console.log(output);
  }

  depth(value) {
    let depth = 0;
    const recursiveDepth = (root) => {
      if (root === null) {
        return console.log("the given data doesnt exist");
      }
      if (root.data == value) {
        console.log(`Depth of ${value}: `, depth);
        return depth;
      }
      if (value > root.data) {
        depth += 1;
        recursiveDepth(root.right);
      } else {
        depth += 1;
        recursiveDepth(root.left);
      }
    };
    recursiveDepth(this.root);
  }

  height(value) {
    let height = 0;
    const recursiveHeight = (node, currentHeight = 0) => {
      if (node === null || node === undefined) {
        return;
      }
      if (currentHeight > height) {
        height = currentHeight;
      }
      recursiveHeight(node.left, currentHeight + 1);
      recursiveHeight(node.right, currentHeight + 1);
    };
    if (!value) {
      recursiveHeight(this.root, 0);
      console.log(`height of Tree: `, height);
      return;
    }
    recursiveHeight(this.find(value));
    console.log(`height of ${value}: `, height);
  }

  isBalanced() {
    const heightData = [];
    function checkEntry(data) {
      let isDuplicate = false;
      for (let i = 0; i < heightData.length; i++) {
        if (data === heightData[i]) {
          isDuplicate = true;
          break;
        }
      }

      if (!isDuplicate) {
        heightData.push(data);
      }
    }
    const recursiveCheckBalance = (node, currentHeight = 0) => {
      if (node == null || (node.right === null && node.left === null)) {
        return checkEntry(currentHeight);
      }
      recursiveCheckBalance(node.left, currentHeight + 1);
      recursiveCheckBalance(node.right, currentHeight + 1);
    };
    recursiveCheckBalance(this.root);
    if (heightData.length > 2) {
      return console.log(false);
    }
    // eslint-disable-next-line no-constant-condition
    if (heightData[0] - heightData[1] == -1 || 1) {
      return console.log(true);
    }
    return heightData;
  }

  reBalance() {
    this.root = buildTree(this.inorder()).root;
  }
}

const sort = (array) => {
  const obj = {};
  array.forEach((arr) => {
    if (!obj[arr]) {
      obj[arr] = true;
    }
  });
  return Object.keys(obj);
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const buildNodeRecursive = (array, start, end) => {
  if (start > end) return null;

  const mid = Math.floor((start + end) / 2);
  const root = new Node(array[mid]);

  root.left = buildNodeRecursive(array, start, mid - 1);
  root.right = buildNodeRecursive(array, mid + 1, end);

  return root;
};

const buildTree = (array) => {
  const sortedArray = sort(array);
  const tree = new Tree();
  tree.root = buildNodeRecursive(sortedArray, 0, sortedArray.length - 1);
  return tree;
};

function randomArray(length) {
  const array = [];
  for (let i = 0; i < length; i++) {
    array.push(Math.round(Math.random() * 500));
  }
  console.log(array);
  return array;
}

const tree1 = buildTree([
  186, 93, 487, 85, 323, 464, 309, 169, 351, 296, 93, 127, 445, 419, 94,
]);
console.log("------------------orginal BST-----------------------");
prettyPrint(tree1.root);
const toIns = randomArray(3);
for (let i = 0; i < toIns.length; i++) {
  tree1.insert(toIns[i]);
}
console.log("------------------ Insertion -----------------------");
prettyPrint(tree1.root);
const toDel = randomArray(3);
for (let i = 0; i < toDel.length; i++) {
  tree1.delete(toDel[i]);
}
console.log("------------------ Deletion -----------------------");
prettyPrint(tree1.root);
console.log("------------------ Depth -----------------------");
tree1.depth(2);
console.log("------------------ Height -----------------------");
tree1.height();
console.log("------------------ Postorder Traversal -----------------------");
tree1.postorder();
console.log("------------------ Inorder Traversal -----------------------");
tree1.inorder();
console.log("------------------ Preorder Traversal -----------------------");
tree1.preorder();
console.log("------------------ Find -----------------------");
tree1.find(500);
tree1.find(16);
console.log("------------------ Level Order -----------------------");
tree1.levelOrder();
prettyPrint(tree1.root);
console.log("------------------ isBalanced -----------------------");
tree1.isBalanced();
console.log("------------------ Rebalance -----------------------");
tree1.reBalance();
prettyPrint(tree1.root);
console.log("------------------ isBalanced -----------------------");
tree1.isBalanced();
