import {
  prob_ASDL_1_11_A,
  prob_ASDL_1_11_D,
  prob_ASDL_1_12_A,
  prob_ASDL_1_12_B,
} from "./prob";
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

export function example_minimum_spanning_tree() {
  prob_ASDL_1_12_A(
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

  prob_ASDL_1_12_A(
    [
      [
        0,
        [
          { id: 1, weight: 8 },
          { id: 2, weight: 12 },
          { id: 3, weight: 3 },
        ],
      ],
      [1, [{ id: 0, weight: 8 }]],
      [2, [{ id: 0, weight: 12 }]],
      [
        3,
        [
          { id: 0, weight: 3 },
          { id: 4, weight: 7 },
          { id: 5, weight: 23 },
        ],
      ],
      [
        4,
        [
          { id: 3, weight: 7 },
          { id: 5, weight: -2 },
        ],
      ],
      [
        5,
        [
          { id: 3, weight: 23 },
          { id: 4, weight: -2 },
        ],
      ],
      [6],
    ],
    "adjacentList",
    { weighted: true }
  );
}

export function example_dijkstra() {
  prob_ASDL_1_12_B(
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
}

export function example_bellman_ford() {
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
  const { d, p, getPath } = g.bellman_ford(0);
  console.log(d, p);
  console.log("0->4", getPath(4));

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
  console.log(d2, p2);
  console.log(getPath2("G"));
}
