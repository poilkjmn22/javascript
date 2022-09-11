import Node from "./Node";

export default class AVLNode extends Node {
  constructor(data, key) {
    super(data, key);
    this.height = 0;
  }
  add(data) {
    let newRoot = this;
    const node =
      data instanceof AVLNode ? data : new AVLNode(data, this.optKey);
    if (node.key <= this.key) {
      this.left = this.addToSubTree(this.left, node);
      this.left.parent = this;
      if (this.heightDifference() === 2) {
        if (node.key < this.left.key) {
          newRoot = this.rotateRight();
        } else {
          newRoot = this.rotateLeftRight();
        }
      }
    } else {
      this.right = this.addToSubTree(this.right, node);
      this.right.parent = this;
      if (this.heightDifference() === -2) {
        if (node.key > this.right.key) {
          newRoot = this.rotateLeft();
        } else {
          newRoot = this.rotateRightLeft();
        }
      }
    }
    newRoot.computeHeight();
    return newRoot;
  }
  addToSubTree(parent, node) {
    if (!parent) {
      return node;
    }
    return parent.add(node);
  }
  computeHeight() {
    let height = -1;
    if (this.left) {
      height = Math.max(height, this.left.height);
    }
    if (this.right) {
      height = Math.max(height, this.right.height);
    }
    this.height = height + 1;
  }
  heightDifference() {
    let leftTarget = 0;
    let rightTarget = 0;
    if (this.left) {
      // +1是因为子节点为空的情况下，它的高度为-1
      leftTarget = 1 + this.left.height;
    }
    if (this.right) {
      rightTarget = 1 + this.right.height;
    }
    return leftTarget - rightTarget;
  }
  rotateRight() {
    let newRoot = this.left;
    let grandson = newRoot.right;
    this.left = grandson;
    newRoot.right = this;

    newRoot.parent = this.parent;
    this.parent = newRoot;
    if (grandson) {
      grandson.parent = this;
    }

    this.computeHeight();
    return newRoot;
  }
  rotateLeftRight() {
    let child = this.left;
    let newRoot = child.right;
    let grand1 = newRoot.left;
    let grand2 = newRoot.right;
    child.right = grand1;
    this.left = grand2;
    newRoot.left = child;
    newRoot.right = this;

    newRoot.parent = this.parent;
    this.parent = newRoot;
    child.parent = newRoot;
    if (grand1) {
      grand1.parent = child;
    }
    if (grand2) {
      grand2.parent = this;
    }

    child.computeHeight();
    this.computeHeight();
    return newRoot;
  }
  rotateLeft() {
    let newRoot = this.right;
    let grandson = newRoot.left;
    this.right = grandson;
    newRoot.left = this;

    newRoot.parent = this.parent;
    this.parent = newRoot;
    if (grandson) {
      grandson.parent = this;
    }

    this.computeHeight();
    return newRoot;
  }
  rotateRightLeft() {
    let child = this.right;
    let newRoot = child.left;
    let grand1 = newRoot.left;
    let grand2 = newRoot.right;
    this.right = grand1;
    child.left = grand2;
    newRoot.left = this;
    newRoot.right = child;

    newRoot.parent = this.parent;
    this.parent = newRoot;
    child.parent = newRoot;
    if (grand1) {
      grand1.parent = this;
    }
    if (grand2) {
      grand2.parent = child;
    }

    this.computeHeight();
    child.computeHeight();
    return newRoot;
  }
  removeFromParent(parent, data) {
    if (parent) {
      return parent.remove(data);
    }
    return null;
  }
  remove(data) {
    let newRoot = this;
    const node =
      data instanceof AVLNode ? data : new AVLNode(data, this.optKey);
    if (node.key === this.key) {
      if (this.left) {
        const maxLeftNode = this.left._findMax();
        this.key = maxLeftNode.key;
        this.data = maxLeftNode.data;
        this.left = this.removeFromParent(this.left, maxLeftNode);
        if (this.heightDifference() === -2) {
          if (this.right.heightDifference() <= 0) {
            newRoot = this.rotateLeft();
          } else {
            newRoot = this.rotateRightLeft();
          }
        }
      } else {
        return this.right;
      }
    } else if (node.key < this.key) {
      this.left = this.removeFromParent(this.left, node);
      if (this.heightDifference() === -2) {
        if (this.right.heightDifference() <= 0) {
          newRoot = this.rotateLeft();
        } else {
          newRoot = this.rotateRightLeft();
        }
      }
    } else {
      this.right = this.removeFromParent(this.right, node);
      if (this.heightDifference() === 2) {
        if (this.left.heightDifference() <= 0) {
          newRoot = this.rotateRight();
        } else {
          newRoot = this.rotateLeftRight();
        }
      }
    }
    return newRoot;
  }
}
