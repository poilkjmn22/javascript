import "./steps.css";
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
const HorizontalLayout = {
  calcPos(step) {
    if (!step.parent) {
      return;
    }
    if (step.level === 1 && !step.text) {
      step.text = `步骤${step.index}`;
    }
    step.textRows = splitText(step.text, this.textCol);

    const p = step.parent;
    if (step.index === 0) {
      step.layout.x = p.layout.x + this.stepPadding[0];
      step.layout.y =
        p.layout.y +
        this.stepPadding[1] +
        (!p.hasTitle()
          ? 0
          : p.textRows.length * this.textHeight + this.stepTitleMargin);
    } else {
      const prevStep = p.substeps[step.index - 1];
      const joinWidth =
        step.level === 1 ? this.arrowLength : this.miniArrowLength;
      if (step.isHorizontal()) {
        step.layout.x = prevStep.layout.x + prevStep.layout.width + joinWidth;
        step.layout.y = prevStep.layout.y;
      } else {
        step.layout.x = prevStep.layout.x;
        step.layout.y = prevStep.layout.y + prevStep.layout.height + joinWidth;
      }
    }
  },
  calcSize(step) {
    if (step.isLeaf()) {
      step.layout.width =
        Math.min(step.text.realLength(), this.textCol) * this.textCharWidth +
        2 * this.leafStepPadding[0];
      step.layout.height =
        step.textRows.length * this.textHeight + 2 * this.leafStepPadding[1];
    } else {
      const joinWidth =
        step.level === 0 ? this.arrowLength : this.miniArrowLength;
      if (step.isHorizontal()) {
        step.layout.width =
          step.substeps.reduce((res, ss) => Math.max(res, ss.layout.width), 0) +
          2 * this.stepPadding[0];
        step.layout.height =
          step.substeps.reduce(
            (res, ss, i) => res + ss.layout.height + (i > 0 ? joinWidth : 0),
            0
          ) +
          2 * this.stepPadding[1] +
          (!step.hasTitle()
            ? 0
            : step.textRows.length * this.textHeight + this.stepTitleMargin);
      } else {
        step.layout.width =
          step.substeps.reduce(
            (res, ss, i) => res + ss.layout.width + (i > 0 ? joinWidth : 0),
            0
          ) +
          2 * this.stepPadding[0];
        step.layout.height =
          step.substeps.reduce(
            (res, ss) => Math.max(res, ss.layout.height),
            0
          ) +
          2 * this.stepPadding[1] +
          (!step.hasTitle()
            ? 0
            : step.textRows.length * this.textHeight + this.stepTitleMargin);
      }
    }
  },
  render(step) {
    const canvas = step.canvas;
    if (!canvas) {
      throw new Error("缺少绘图对象canvas");
    }
    if (!step.parent) {
      canvas.attr("width", step.layout.width);
      canvas.attr("height", step.layout.height);
      return;
    }
    const { x, y, width, height } = step.layout;
    const g = canvas.append("g").attr("class", "g-handle-step");
    const rect = g
      .append("rect")
      .attr("x", x)
      .attr("y", y)
      .attr("class", "step-rect")
      .attr("width", width)
      .attr("height", height);
    const text = g
      .append("text")
      .attr("class", "step-text")
      .attr("class", step.isLeaf() || !step.text ? "" : "step-title");
    if (step.textRows.length > 0) {
      text
        .selectAll("tspan")
        .data(step.textRows)
        .enter()
        .append("tspan")
        .text((d) => d)
        .attr(
          "x",
          x +
            this.leafStepPadding[0] +
            (step.isLeaf() || !step.text ? 0 : width / 2)
        )
        .attr(
          "y",
          (d, i) => y + i * this.textHeight + this.leafStepPadding[1] + 16
        );
    }
  },
  stepPadding: [10, 10],
  leafStepPadding: [5, 5],
  arrowLength: 60,
  miniArrowLength: 15,
  textCol: 14,
  textCharWidth: 10,
  textHeight: 20,
  stepTitleMargin: 20,
};

export default HorizontalLayout;
