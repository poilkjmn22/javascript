import { prob_ALDS_1_8_A } from "./prob";

export function example_prob_ALDS_1_8_A() {
  prob_ALDS_1_8_A([30, 88, 12, 1, 20, 17, 25]);
  prob_ALDS_1_8_A(
    [
      { name: "a", weight: 30 },
      { name: "b", weight: 88 },
      { name: "c", weight: 12 },
      { name: "d", weight: 1 },
      { name: "e", weight: 20 },
      { name: "f", weight: 17 },
      { name: "g", weight: 25 },
    ],
    "weight"
  );
}
