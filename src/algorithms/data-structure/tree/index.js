import { prob_ALDS_1_7_A } from "./prob";

export function example_prob_ALDS_1_7_A() {
  prob_ALDS_1_7_A(
    [
      { nodeId: 0, parentId: undefined },
      { nodeId: 1, parentId: 0 },
      { nodeId: 4, parentId: 0 },
      { nodeId: 10, parentId: 0 },
      { nodeId: 2, parentId: 1 },
      { nodeId: 3, parentId: 1 },
      { nodeId: 5, parentId: 4 },
      { nodeId: 6, parentId: 4 },
      { nodeId: 7, parentId: 4 },
      { nodeId: 11, parentId: 10 },
      { nodeId: 12, parentId: 10 },
      { nodeId: 8, parentId: 7 },
      { nodeId: 9, parentId: 7 },
    ],
    { customID: "nodeId", parentProperty: "parentId" }
  );
}
