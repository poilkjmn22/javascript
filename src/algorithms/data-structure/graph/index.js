import { prob_ASDL_1_11_A } from "./prob";
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
    "value"
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
