import { prob_ALDS_1_9_B } from "./prob";

describe("test maxHeap probs", () => {
  test("test prob ALDS_1_9_B", () => {
    expect(prob_ALDS_1_9_B([4, 1, 3, 2, 16, 9, 10, 14, 8, 7])).toEqual([
      16, 14, 10, 8, 7, 9, 3, 2, 4, 1,
    ]);
    expect(
      prob_ALDS_1_9_B([5, 86, 37, 12, 25, 32, 11, 7, 1, 2, 4, 19])
    ).toEqual([86, 25, 37, 12, 5, 32, 11, 7, 1, 2, 4, 19]);
  });
});
