import { prob_ALDS_1_3_A } from "./prob";

describe("test stack probs", () => {
  test("逆波兰表示法的题目", () => {
    expect(prob_ALDS_1_3_A([1, 2, "*", 3, 4, "-", "*"])).toBe(-2);
    expect(prob_ALDS_1_3_A([1, 2, "*", 3, 4, "-", "-"])).toBe(3);
    expect(prob_ALDS_1_3_A([1, 2, "*", 3, 4, "-", "-", 6, "*"])).toBe(18);
  });
});
