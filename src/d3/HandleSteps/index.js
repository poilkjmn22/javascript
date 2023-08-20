import Step from "./Step";
import * as d3 from "d3";
import SizeVisitor from "./visitor/SizeVisitor";
import PosVisitor from "./visitor/PosVisitor";
import RenderVisitor from "./visitor/RenderVisitor";
function drawStepsChart(box, data) {
  const canvas = d3.select(box).append("svg");
  const rootStep = new Step({ substeps: data }, 0, null, canvas);
  rootStep.accept(SizeVisitor);
  // console.log(rootStep);
  rootStep.accept(PosVisitor);
  rootStep.accept(RenderVisitor);
}

export { drawStepsChart };
