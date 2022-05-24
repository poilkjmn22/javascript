import { prob_ASDL_1_11 } from "./prob";

export function example_prob_ASDL_1_11() {
  const g = prob_ASDL_1_11([[1, [2, 4]], [2, [4]], [3], [4, [3]]]);
  console.log(g.M);

  const g2 = prob_ASDL_1_11(
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
