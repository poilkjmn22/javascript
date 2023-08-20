import IVisitor from "./IVisitor";
const PosVisitor = Object.create(IVisitor, {
  visitStep: {
    value: function (step) {
      this.sl.calcPos(step);
      for (const ss of step.substeps) {
        ss.accept(this);
      }
    },
  },
  visitLeafStep: {
    value: function (step) {
      this.sl.calcPos(step);
    },
  },
});
export default PosVisitor;
