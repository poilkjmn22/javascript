import Vertice from "./Vertice";
// V * V 的矩阵来表示图
export default class AdjacentMatrix {
  constructor(data, weight) {
    this.M = [];
    this.weight = weight;
    this.V = this.convertData(data);
    this.buildGraph(data);
  }
  buildGraph(data) {
    for (let i = 0; i < this.V.length; i++) {
      this.M[i] = [];
      for (let j = 0; j < this.V.length; j++) {
        this.M[i].push(0);
      }
    }
    for (let i = 0; i < this.V.length; i++) {
      const [, adjacent] = data[i];
      if (!adjacent) {
        continue;
      }
      for (const j of adjacent) {
        this.M[i][j - 1] = 1;
      }
    }
  }
  convertData(data) {
    const V = [];
    for (const v of data) {
      const [vertice] = v;
      V.push(new Vertice(vertice, this.weight));
    }
    return V;
  }
}
