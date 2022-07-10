import AdjacentMatrix from "./AdjacentMatrix";
export function prob_ASDL_1_11_A(data, dataSourceType, options) {
  const g = new AdjacentMatrix(data, dataSourceType, options);
  return g;
}

export function prob_ASDL_1_11_D(friends, questions) {
  const g = new AdjacentMatrix(friends, "edgeList");
  const colors = ["red", "black", "white", "yellow", "green", "blue"];
  let connected = -1;
  g.traverse((v, sv) => {
    if (sv) {
      connected += 1;
    }
    v.color = colors[connected];
  });

  for (const q of questions) {
    const [from, to] = q;
    console.log(
      `${from} and ${to} can${
        g.V.find((v) => v.id === from).color ===
        g.V.find((v) => v.id === to).color
          ? ""
          : " not"
      } connected
      `
    );
  }
}

export function prob_ASDL_1_12_A(data, dataSourceType, options) {
  const g = new AdjacentMatrix(data, dataSourceType, options);
  const { MST, P, MST_weight } = g.generateMinimumSpanningTree();
  console.log(MST, P, MST_weight);
}

export function prob_ASDL_1_12_B(data, dataSourceType, options) {
  const g = new AdjacentMatrix(data, dataSourceType, options);
  const { d, p } = g.dijkstra(0);
  console.log(d, p);
}
