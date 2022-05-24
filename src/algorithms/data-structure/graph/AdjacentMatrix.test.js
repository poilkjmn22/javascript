import AdjacentMatrix from "./AdjacentMatrix";
describe("test the AdjacentMatrix class", () => {
  test("method build graph", () => {
    const g = new AdjacentMatrix([[1, [2, 4]], [2, [4]], [3], [4, [3]]]);
    expect(g.M).toEqual([
      [0, 1, 0, 1],
      [0, 0, 0, 1],
      [0, 0, 0, 0],
      [0, 0, 1, 0],
    ]);

    const g2 = new AdjacentMatrix([
      [{ value: 1 }, [2, 4]],
      [{ value: 2 }, [4]],
      [{ value: 3 }],
      [{ value: 4 }, [3]],
    ]);
    expect(g2.M).toEqual([
      [0, 1, 0, 1],
      [0, 0, 0, 1],
      [0, 0, 0, 0],
      [0, 0, 1, 0],
    ]);
  });
});
