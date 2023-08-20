String.prototype.realLength = function () {
  let res = 0;
  for (const c of this) {
    const l = c.charCodeAt(0) <= 255 ? 1 : 2;
    res += l;
  }
  return res;
};

function splitText(text, col) {
  const res = [];
  if (!text) {
    return res;
  }
  let currLength = 0;
  let temp = "";
  for (const c of text) {
    temp += c;
    currLength += c.realLength();
    if (currLength >= col) {
      res.push(temp);
      currLength = 0;
      temp = "";
    }
  }
  if (temp) {
    res.push(temp);
  }
  return res;
}
export default class BaseStep {
  constructor(data, index, parent) {
    this.data = data || {};
    this.text = data.text || "";
    this.index = index;
    this.parent = parent;
    this.layout = { x: 0, y: 0, width: 0, height: 0 };
    this.level = parent ? parent.level + 1 : 0;
    if (this.level === 1 && !this.text) {
      this.text = `步骤${this.index}`;
    }
    this.textRows = splitText(this.text, this.textCol);
  }
  isLeaf() {
    return !this.substeps;
  }
  isHorizontal() {
    return this.level & 1;
  }
  hasTitle() {
    return !this.isLeaf() && this.text;
  }
  static isLeafStep(data) {
    return !data.substeps || data.substeps.length <= 0;
  }
  accept(visitor) {
    this.isLeaf() ? visitor.visitLeafStep(this) : visitor.visitStep(this);
  }
}

BaseStep.prototype.canvas = null;
