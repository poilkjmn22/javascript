import { getKey } from "../../../utils/util";
export default class Vertice {
  constructor(data, verticeIndex, weight) {
    this.data = data;
    this.verticeIndex = verticeIndex;
    this.weight = getKey(data, weight);
  }
}
