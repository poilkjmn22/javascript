import Stack from "../stack/Stack";
import Queue from "../queue/Queue";
import PriorityQueue from "../priority-queue/PriorityQueue";
import Vertice from "./Vertice";
import Edge from "./Edge";
import { getKey } from "../../../utils/util";

const defaultOptions = {
  weighted: false,
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
        this.M[i].push(this.options.weighted ? Infinity : 0);
      }
    }
    for (let i = 0; i < this.V.length; i++) {
      const [, adjacent] = this.adjacentList[i];
      if (!adjacent) {
        continue;
      }
      for (const j of adjacent) {
        let id = j;
        let weight = 1;
        if (this.options.weighted) {
          id = j.id;
          weight = j.weight;
        }

        const toVertice = this.V.find((v) => v.id === id);
        if (!toVertice) {
          throw new Error("到达顶点不存在！");
        }
        this.M[i][toVertice.verticeIndex] = weight;
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
  hasEdge(value) {
    return this.options.weighted ? Math.abs(value) !== Infinity : !!value;
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
        this.hasEdge(this.M[vertice.verticeIndex][i]) &&
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
        this.hasEdge(this.M[vertice.verticeIndex][i]) &&
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
          this.hasEdge(this.M[v.verticeIndex][i]) &&
          nv.visitStatus === visitStatus.UNVISITED
        ) {
          Q.enqueue(nv);
          nv.visitStatus = visitStatus.VISITED;
          nv.distance = v.distance + 1;
        }
      }
    }
  }
  generateMinimumSpanningTree() {
    let MST_weight = 0;
    let cv = this.V[0];
    const MST = [];
    const P = [];
    const checkingEdges = new PriorityQueue([], (edge) => edge.weight * -1);
    const addConnEdges = (cv, from) => {
      cv.added = true;
      for (let i = 0; i < this.V.length; i++) {
        if (!this.V[i].added && this.hasEdge(this.M[cv.verticeIndex][i])) {
          checkingEdges.enqueue(
            new Edge(cv.verticeIndex, i, this.M[cv.verticeIndex][i])
          );
        }
      }
      MST.push(cv.data);
      P.push(from && from.data);
    };
    addConnEdges(cv);
    for (let i = 1; i < this.V.length; i++) {
      if (checkingEdges.isEmpty()) {
        break;
      }
      const { from, to, weight } = checkingEdges.dequeue();
      cv = this.V[to];
      if (cv.added) {
        break;
      }
      MST_weight += weight;
      addConnEdges(cv, this.V[from]);
    }
    return {
      MST,
      P,
      MST_weight,
    };
  }
  dijkstra(source) {
    const sourceId = getKey(source, this.options.id);
    const sv = this.V.find((v) => v.id === sourceId);
    const d = initD(this.V, sv);
    const p = [];
    function initD(V, s) {
      const d = new Array(V.length).fill(Infinity);
      d[s.verticeIndex] = 0;
      return d;
    }
    const minDQ = new PriorityQueue([], (item) => item.d * -1);
    minDQ.enqueue({ vi: sv.verticeIndex, d: 0, parent: -1 });
    while (1) {
      if (minDQ.isEmpty()) {
        break;
      }
      const { vi, parent } = minDQ.dequeue();
      if (this.V[vi].used === true) {
        continue;
      }
      // console.log(vi, parent);
      p[vi] = parent;
      this.V[vi].used = true;
      for (let i = 0; i < this.V.length; i++) {
        if (
          !this.V[i].used &&
          this.M[vi][i] !== Infinity &&
          d[vi] + this.M[vi][i] < d[i]
        ) {
          d[i] = d[vi] + this.M[vi][i];
          minDQ.enqueue({ vi: i, parent: vi, d: d[i] });
        }
      }
    }
    const getPath = (target) => {
      const targetId = getKey(target, this.options.id);
      const tv = this.V.find((v) => v.id === targetId);
      const path = [];
      let tmp = p[tv.verticeIndex];
      do {
        path.unshift(tmp);
        tmp = p[tmp];
      } while (tmp > -1);
      return path;
    };
    return { d, p, getPath };
  }
}
