import BaseStep from "./BaseStep";
import LeafStep from "./LeafStep";
export default class Step extends BaseStep {
  constructor(data, index, parent, canvas) {
    if (canvas) {
      BaseStep.prototype.canvas = canvas;
    }
    super(data, index, parent);
    this.substeps = [];
    this.calcPos();
    for (let i = 0; i < data.substeps.length; i++) {
      const ss = data.substeps[i];
      const s = BaseStep.isLeafStep(ss)
        ? new LeafStep(ss, i, this)
        : new Step(ss, i, this);
      this.substeps.push(s);
    }
    this.calcSize();
    this.render();
  }
}
