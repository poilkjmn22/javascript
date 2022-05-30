import { getKey } from "../../../utils/util";
export default class Vertice {
  constructor(data, verticeIndex, { id }) {
    this.data = data;
    this.verticeIndex = verticeIndex;
    this.id = getKey(data, id);
  }
}
