import { getKey } from "../../../utils/util";
export default class Vertice {
  constructor(data, weight) {
    this.data = data;
    this.weight = getKey(data, weight);
  }
}
