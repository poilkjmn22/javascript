import { getKey } from "../../../utils/util";
export default class Vertice {
  constructor(data, verticeIndex, { weight, id }) {
    this.data = data;
    this.verticeIndex = verticeIndex;
    this.id = getKey(data, id);
    this.weight = getKey(data, weight);
  }
}
