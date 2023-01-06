export default class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
  toString() {
    return `${this.key}:${this.value}`;
  }
}
