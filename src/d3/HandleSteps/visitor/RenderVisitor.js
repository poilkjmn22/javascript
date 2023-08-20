import IVisitor from "./IVisitor";
const RenderVisitor = Object.create(IVisitor, {
  visitStep: {
    value: function (step) {
      for (const ss of step.substeps) {
        ss.accept(this);
      }
      this.sl.render(step);
    },
  },
  visitLeafStep: {
    value: function (step) {
      this.sl.render(step);
    },
  },
});
export default RenderVisitor;
