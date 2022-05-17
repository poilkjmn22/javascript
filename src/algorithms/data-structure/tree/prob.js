import Tree from "./Tree";
export function prob_ALDS_1_7_A(data, options) {
  const t = new Tree(data, options);

  t.traverse((n) => {
    console.log(
      `node ${n.nodeId}: parent: ${n.parentId}, depth = ${n.depth}, ${
        n.nodeType
      }, ${(n.children && n.children.map((c) => c.nodeId)) || []}`
    );
  });
}
