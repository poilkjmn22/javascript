import { getKey } from "../../../utils/util";
export default class Node {
  constructor(data, key) {
    this.parent = null;
    this.left = null;
    this.right = null;
    this.data = data;
    this.key = getKey(data, key);
  }
}
