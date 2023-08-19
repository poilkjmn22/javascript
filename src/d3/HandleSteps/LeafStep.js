import BaseStep from "./BaseStep";
export default class LeafStep extends BaseStep {
  constructor(data, index, parent) {
    super(data, index, parent);
    this.calcPos();
    this.calcSize();
    this.render();
  }
}
