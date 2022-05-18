import BinarySearchTree from "./BinarySearchTree";
export function prob_ALDS_1_8_A(data, key) {
  const t = new BinarySearchTree(data, key);

  console.log("inorder", t.toArray());
  console.log("preorder", t.toArray("preorder"));
  console.log("postorder", t.toArray("postorder"));
}
