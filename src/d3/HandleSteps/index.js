import Step from "./Step";
import * as d3 from "d3";
function drawStepsChart(box, data) {
  const canvas = d3.select(box).append("svg");
  const rootStep = new Step({ substeps: data }, 0, null, canvas);
  console.log(rootStep);
}

export { drawStepsChart };
