import Stack from "../stack/Stack";
import Queue from "../queue/Queue";
import Vertice from "./Vertice";
import { getKey } from "../../../utils/util";

const defaultOptions = {
  weight: "",
  id: "",
};

const visitStatus = {
  UNVISITED: "UNVISITED",
  VISITED: "VISITED",
  FINISHED: "FINISHED",
};
let dfsTime = 0;
// V * V 的矩阵来表示图
export default class AdjacentMatrix {
  constructor(data = [], dataSourceType = "adjacentList", options) {
    this.M = [];
    this.V = [];
    this.options = Object.assign({}, defaultOptions, options);
    this.buildGraph(data, dataSourceType);
  }
  buildGraph(data, dataSourceType) {
    this.V = this.convertData(data, dataSourceType);
    for (let i = 0; i < this.V.length; i++) {
      this.M[i] = [];
      for (let j = 0; j < this.V.length; j++) {
        this.M[i].push(0);
      }
    }
    for (let i = 0; i < this.V.length; i++) {
      const [, adjacent] = this.adjacentList[i];
      if (!adjacent) {
        continue;
      }
      for (const j of adjacent) {
        const toVertice = this.V.find((v) => v.id === j);
        if (!toVertice) {
          throw new Error("到达顶点不存在！");
        }
        this.M[i][toVertice.verticeIndex] = 1;
      }
    }
  }
  convertData(data, dataSourceType) {
    let cd = [];
    if (dataSourceType === "adjacentList") {
      cd = data;
    } else if (dataSourceType === "edgeList") {
      cd = this.convertEdges(data);
    }
    this.adjacentList = cd;
    const V = [];
    for (let i = 0; i < cd.length; i++) {
      const [vertice] = cd[i];
      V.push(new Vertice(vertice, i, this.options));
    }
    return V;
  }
  convertEdges({ vertices, edges }) {
    const adjacentList = new Map();
    for (const v of vertices) {
      const id = getKey(v, this.options.id);
      adjacentList.set(id, [v, []]);
    }
    for (const edge of edges) {
      const [from, to] = edge;
      const [, a] = adjacentList.get(from);
      if (a) {
        a.push(to);
      }
    }
    return [...adjacentList.values()];
  }
  traverse(cb) {
    this.initDfs();
    for (const v of this.V) {
      if (v.visitStatus === visitStatus.UNVISITED) {
        // this.dfs(v, cb);
        this.dfsByRecusiveness(v, cb, v);
      }
    }
  }
  traverseBfs(cb) {
    this.initBfs();
    for (const v of this.V) {
      if (v.visitStatus === visitStatus.UNVISITED) {
        this.bfs(v, cb);
      }
    }
  }
  initDfs() {
    dfsTime = 0;
    for (const v of this.V) {
      v.visitStatus = visitStatus.UNVISITED;
      v.visitTime = 0;
      v.finishTime = 0;
    }
  }
  dfs(vertice, cb) {
    if (vertice.visitStatus !== visitStatus.UNVISITED) {
      return;
    }
    // 深度优先遍历
    const S = new Stack();
    S.push(vertice);
    while (!S.isEmpty()) {
      const v = S.top();
      if (v.visitStatus === visitStatus.UNVISITED) {
        v.visitStatus = visitStatus.VISITED;
        v.visitTime = ++dfsTime;
        cb(v);
      }
      const nextUnvisitedAdjacent = this.findNextUnvisitedAdjacent(v);
      if (nextUnvisitedAdjacent) {
        S.push(nextUnvisitedAdjacent);
      } else {
        S.pop();
        v.visitStatus = visitStatus.FINISHED;
        v.finishTime = ++dfsTime;
      }
    }
  }
  dfsByRecusiveness(vertice, cb, startVertice) {
    vertice.visitStatus = visitStatus.VISITED;
    vertice.visitTime = ++dfsTime;
    cb(vertice, startVertice);
    for (let i = 0; i < this.V.length; i++) {
      const v = this.V[i];
      if (
        this.M[vertice.verticeIndex][i] === 1 &&
        v.visitStatus === visitStatus.UNVISITED
      ) {
        this.dfsByRecusiveness(v, cb);
      }
    }
    vertice.visitStatus = visitStatus.FINISHED;
    vertice.finishTime = ++dfsTime;
  }
  findNextUnvisitedAdjacent(vertice) {
    let nextUnvisitedAdjacent;
    for (let i = 0; i < this.V.length; i++) {
      if (
        this.M[vertice.verticeIndex][i] === 1 &&
        this.V[i].visitStatus === visitStatus.UNVISITED
      ) {
        nextUnvisitedAdjacent = this.V[i];
        break;
      }
    }
    return nextUnvisitedAdjacent;
  }
  initBfs() {
    for (const v of this.V) {
      v.visitStatus = visitStatus.UNVISITED;
      v.distance = 0;
    }
  }
  bfs(vertice, cb) {
    if (vertice.visitStatus !== visitStatus.UNVISITED) {
      return;
    }
    // 广度优先遍历
    const Q = new Queue();
    Q.enqueue(vertice);
    vertice.visitStatus = visitStatus.VISITED;
    while (!Q.isEmpty()) {
      const v = Q.dequeue();
      if (v.visitStatus === visitStatus.VISITED) {
        v.visitStatus = visitStatus.FINISHED;
        cb(v);
      }
      for (let i = 0; i < this.V.length; i++) {
        const nv = this.V[i];
        if (
          this.M[v.verticeIndex][i] === 1 &&
          nv.visitStatus === visitStatus.UNVISITED
        ) {
          Q.enqueue(nv);
          nv.visitStatus = visitStatus.VISITED;
          nv.distance = v.distance + 1;
        }
      }
    }
  }
}
