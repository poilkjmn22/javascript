import IVisitor from "./IVisitor";
const SizeVisitor = Object.create(IVisitor, {
  visitStep: {
    value: function (step) {
      for (const ss of step.substeps) {
        ss.accept(this);
      }
      this.sl.calcSize(step);
    },
  },
  visitLeafStep: {
    value: function (step) {
      this.sl.calcSizeLeaf(step);
    },
  },
});
export default SizeVisitor;
