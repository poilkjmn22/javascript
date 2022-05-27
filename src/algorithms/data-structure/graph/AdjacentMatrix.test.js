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

    const g2 = new AdjacentMatrix(
      [
        [{ value: 1 }, [2, 4]],
        [{ value: 2 }, [4]],
        [{ value: 3 }],
        [{ value: 4 }, [3]],
      ],
      "adjacentList",
      { id: "value" }
    );
    expect(g2.M).toEqual([
      [0, 1, 0, 1],
      [0, 0, 0, 1],
      [0, 0, 0, 0],
      [0, 0, 1, 0],
    ]);

    const g3 = new AdjacentMatrix();
    expect(g3.M).toEqual([]);
  });

  test("method convertEdges", () => {
    const g = new AdjacentMatrix();
    const res = g.convertEdges({
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
    });
    expect(res).toEqual([
      [0, [1, 2]],
      [1, []],
      [2, []],
      [3, [4]],
      [4, []],
      [5, [7, 6]],
      [6, [7, 8]],
      [7, [8]],
      [8, [9]],
      [9, []],
    ]);
  });

  test("method traverse dfs", () => {
    const g = new AdjacentMatrix([
      [1, [2, 3]],
      [2, [3, 4]],
      [3, [5]],
      [4, [6]],
      [5, [6]],
      [6],
    ]);
    const traverseDfsRes = [];
    g.traverse((v) => traverseDfsRes.push(v.data));
    expect(traverseDfsRes).toEqual([1, 2, 3, 5, 6, 4]);
  });

  test("method traverse bfs", () => {
    const g = new AdjacentMatrix([
      [1, [2, 3]],
      [2, [3, 4]],
      [3, [5]],
      [4, [6]],
      [5, [6]],
      [6],
    ]);
    const traverseBfsRes = [];
    g.traverseBfs((v) => traverseBfsRes.push(v.data));
    expect(traverseBfsRes).toEqual([1, 2, 3, 4, 5, 6]);
    expect(g.V.map((v) => [v.data, v.distance])).toEqual([
      [1, 0],
      [2, 1],
      [3, 1],
      [4, 2],
      [5, 2],
      [6, 3],
    ]);

    const g2 = new AdjacentMatrix([[1, [2, 4]], [2, [4]], [3], [4, [3]]]);
    const traverseBfsRes2 = [];
    g2.traverseBfs((v) => traverseBfsRes2.push(v.data));
    expect(traverseBfsRes2).toEqual([1, 2, 4, 3]);
    expect(g2.V.map((v) => [v.data, v.distance])).toEqual([
      [1, 0],
      [2, 1],
      [3, 2],
      [4, 1],
    ]);
  });
});
