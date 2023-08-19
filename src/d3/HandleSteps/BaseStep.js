import HorizontalLayout from "./HorizontalLayout";
export default class BaseStep {
  constructor(data, index, parent) {
    this.text = data.text || "";
    this.index = index;
    this.parent = parent;
    this.layout = { x: 0, y: 0, width: 0, height: 0 };
    this.level = parent ? parent.level + 1 : 0;
  }
  calcPos() {
    this.sl.calcPos(this);
  }
  calcSize() {
    this.sl.calcSize(this);
  }
  render() {
    this.sl.render(this);
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
}

BaseStep.prototype.sl = HorizontalLayout;
BaseStep.prototype.canvas = null;
