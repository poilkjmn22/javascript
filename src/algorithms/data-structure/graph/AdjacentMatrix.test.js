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

  test("method generateMinimumSpanningTree", () => {
    const g = new AdjacentMatrix(
      [
        [
          0,
          [
            { id: 1, weight: 2 },
            { id: 2, weight: 3 },
            { id: 3, weight: 1 },
          ],
        ],
        [
          1,
          [
            { id: 0, weight: 2 },
            { id: 3, weight: 4 },
          ],
        ],
        [
          2,
          [
            { id: 0, weight: 3 },
            { id: 3, weight: 1 },
            { id: 4, weight: 1 },
          ],
        ],
        [
          3,
          [
            { id: 0, weight: 1 },
            { id: 1, weight: 4 },
            { id: 2, weight: 1 },
            { id: 4, weight: 3 },
          ],
        ],
        [
          4,
          [
            { id: 2, weight: 1 },
            { id: 3, weight: 3 },
          ],
        ],
      ],
      "adjacentList",
      { weighted: true }
    );
    const { MST, P, MST_weight } = g.generateMinimumSpanningTree();
    expect(MST_weight).toBe(5);
  });

  test("method dijkstra", () => {
    const g = new AdjacentMatrix(
      [
        [
          0,
          [
            { id: 2, weight: 3 },
            { id: 3, weight: 1 },
            { id: 1, weight: 2 },
          ],
        ],
        [
          1,
          [
            { id: 0, weight: 2 },
            { id: 3, weight: 4 },
          ],
        ],
        [
          2,
          [
            { id: 0, weight: 3 },
            { id: 3, weight: 1 },
            { id: 4, weight: 1 },
          ],
        ],
        [
          3,
          [
            { id: 0, weight: 1 },
            { id: 1, weight: 4 },
            { id: 2, weight: 1 },
            { id: 4, weight: 3 },
          ],
        ],
        [
          4,
          [
            { id: 2, weight: 1 },
            { id: 3, weight: 3 },
          ],
        ],
      ],
      "adjacentList",
      { weighted: true }
    );
    const { d, p, getPath } = g.dijkstra(0);
    expect(d).toEqual([0, 2, 2, 1, 3]);
    expect(p).toEqual([-1, 0, 3, 0, 2]);
    expect(getPath(4)).toEqual([0, 3, 2]);
    expect(getPath(2)).toEqual([0, 3]);
  });

  test("method bellman_ford", () => {
    const g2 = new AdjacentMatrix(
      [
        [
          "A",
          [
            { id: "B", weight: 2 },
            { id: "C", weight: 5 },
          ],
        ],
        [
          "B",
          [
            { id: "A", weight: 2 },
            { id: "C", weight: 4 },
            { id: "D", weight: 6 },
            { id: "E", weight: 10 },
          ],
        ],
        [
          "C",
          [
            { id: "A", weight: 5 },
            { id: "B", weight: 4 },
            { id: "D", weight: 2 },
          ],
        ],
        [
          "D",
          [
            { id: "C", weight: 2 },
            { id: "B", weight: 6 },
            { id: "F", weight: 1 },
          ],
        ],
        [
          "E",
          [
            { id: "B", weight: 10 },
            { id: "F", weight: 3 },
            { id: "G", weight: 5 },
          ],
        ],
        [
          "F",
          [
            { id: "D", weight: 1 },
            { id: "E", weight: 3 },
            { id: "G", weight: 9 },
          ],
        ],
        [
          "G",
          [
            { id: "E", weight: 5 },
            { id: "F", weight: 9 },
          ],
        ],
      ],
      "adjacentList",
      { weighted: true }
    );
    const { d: d2, p: p2, getPath: getPath2 } = g2.bellman_ford("A");
    expect(d2).toEqual([0, 2, 5, 7, 11, 8, 16]);
    expect(p2).toEqual([undefined, 0, 0, 2, 5, 3, 4]);
    expect(getPath2("G")).toBe("A->C->D->F->E->G,共16");
  });
});
