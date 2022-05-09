import { prob_ALDS_1_3_B } from "./prob";

describe("test queue probs", () => {
  test("CPU循环调度法处理任务", () => {
    expect(
      prob_ALDS_1_3_B(100, [
        ["p1", 150],
        ["p2", 80],
        ["p3", 200],
        ["p4", 350],
        ["p5", 20],
      ])
    ).toEqual([
      ["p2", 180],
      ["p5", 400],
      ["p1", 450],
      ["p3", 550],
      ["p4", 800],
    ]);
  });
});
