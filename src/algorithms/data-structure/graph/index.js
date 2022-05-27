import { prob_ASDL_1_11_A, prob_ASDL_1_11_D } from "./prob";
import AdjacentMatrix from "./AdjacentMatrix";

export function example_prob_ASDL_1_11_A() {
  const g = prob_ASDL_1_11_A([[1, [2, 4]], [2, [4]], [3], [4, [3]]]);
  console.log(g.M);

  const g2 = prob_ASDL_1_11_A(
    [
      [{ value: 1 }, [2, 4]],
      [{ value: 2 }, [4]],
      [{ value: 3 }],
      [{ value: 4 }, [3]],
    ],
    "adjacentList",
    { id: "value" }
  );
  console.log(g2);
}

export function example_dfs() {
  // const g = new AdjacentMatrix([[1, [2, 4]], [2, [4]], [3], [4, [3]]]);
  // g.traverse((v) => console.log(v.data));

  const g2 = new AdjacentMatrix([
    [1, [2, 3]],
    [2, [3, 4]],
    [3, [5]],
    [4, [6]],
    [5, [6]],
    [6],
  ]);
  g2.traverse((v) => console.log(v.data));
  for (const v of g2.V) {
    console.log(`${v.data} ${v.visitTime} ${v.finishTime}`);
  }
}

export function example_bfs() {
  const g2 = new AdjacentMatrix([
    [1, [2, 3]],
    [2, [3, 4]],
    [3, [5]],
    [4, [6]],
    [5, [6]],
    [6],
  ]);
  g2.traverseBfs((v) => console.log(v.data));
  for (const v of g2.V) {
    console.log(`${v.data} ${v.distance}`);
  }
}

export function example_connected_components() {
  prob_ASDL_1_11_D(
    {
      vertices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      edges: [
        [0, 1],
        [0, 2],
        [3, 4],
        [5, 7],
        [5, 6],
        [6, 7],
        [6, 8],
        [7, 8],
        [8, 9],
      ],
    },
    [
      [0, 1],
      [5, 9],
      [1, 3],
      [0, 4],
      [5, 8],
    ]
  );
}
