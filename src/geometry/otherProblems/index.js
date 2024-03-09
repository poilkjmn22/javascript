import { nTimes, random } from "@/utils/util";
import { clearCanvas, drawGeo } from "@/geometry/utils";
import { Point } from "@/geometry/base";
import {
  getClosestPairByExhaustion,
  getClosestPairByDivideAndConquer,
  getClosestPairByDP,
} from "./prob";
import { drawBarChart } from "@/utils/d3Helper";
import { CSvg } from "@/utils/svg";

// const Benchmark = require("benchmark");
export function ClosestPair(elContainer) {
  elContainer.scrollIntoView({ block: "center" });

  const elcanvas = document.createElement("canvas");
  const { width, height } = elContainer.getBoundingClientRect();
  elcanvas.width = width;
  elcanvas.height = height;
  elcanvas.style.border = "1px solid gray";
  elContainer.appendChild(elcanvas);
  elContainer.style.position = "relative";
  const ctx = elcanvas.getContext("2d");

  const btnClear = document.createElement("input");
  btnClear.setAttribute(
    "style",
    "position: absolute;top: 10px;right: 10px;width: 100px;height: 40px;cursor: pointer;text-align:center"
  );
  btnClear.setAttribute("type", "button");
  btnClear.value = "清除";
  elContainer.appendChild(btnClear);
  btnClear.addEventListener("click", () => clearCanvas(ctx), false);

  const btnCreateRandomPoints = document.createElement("input");
  btnCreateRandomPoints.setAttribute(
    "style",
    "position: absolute;top: 10px;right: 230px;width: 100px;height: 40px;cursor: pointer;text-align:center"
  );
  btnCreateRandomPoints.setAttribute("type", "button");
  btnCreateRandomPoints.value = "生成100个点";
  elContainer.appendChild(btnCreateRandomPoints);

  const btnPointsNum = document.createElement("input");
  btnPointsNum.setAttribute(
    "style",
    "position: absolute;top: 10px;right: 120px;width: 100px;height: 40px;cursor: pointer;text-align:center"
  );
  btnPointsNum.setAttribute("type", "number");
  btnPointsNum.value = "100";
  elContainer.appendChild(btnPointsNum);
  btnPointsNum.addEventListener(
    "input",
    (e) => {
      btnCreateRandomPoints.value = `生成${e.target.value}个点`;
    },
    false
  );

  btnCreateRandomPoints.addEventListener(
    "click",
    () => {
      clearCanvas(ctx);
      const gap = 10;
      const points = [];
      for (const n of nTimes(parseInt(btnPointsNum.value))) {
        const point = new Point(
          random(0 + gap, width - gap),
          random(0 + 60, height - gap)
        );
        points.push(point);
        drawGeo(ctx, point, { fillStyle: "#7ed321", size: 2 });
      }

      // const suite = new Benchmark.Suite();
      // const statistics = [];
      // suite
        // .add("exhaustion", () => {
          // getClosestPairByExhaustion(points);
        // })
        // .add("dynamic programming", () => {
          // getClosestPairByDP(points);
        // })
        // .add("divide and conquer", () => {
          // getClosestPairByDivideAndConquer(points);
        // })
        // .on("cycle", (e) => {
          // const { times, name } = e.target;
          // statistics.push({ name, value: times.period * 1000 });
        // })
        // .on("complete", function () {
          // console.log("Fastest is " + this.filter("fastest").map("name"));
          // let chartBox = elContainer.querySelector(".chart-box");
          // if (chartBox) {
            // chartBox.innerHTML = "";
          // } else {
            // chartBox = document.createElement("div");
            // chartBox.classList.add("chart-box");
            // chartBox.setAttribute("style", "height: 400px");
            // elContainer.appendChild(chartBox);
          // }
// 
          // chartBox.appendChild(CSvg());
          // drawBarChart(statistics, chartBox, { sort: "descending" });
        // })
        // .run({ async: true });

      // const [, , d1] = getClosestPairByExhaustion(points);
      // const d2 = getClosestPairByDivideAndConquer(points);
      // const d3 = getClosestPairByDP(points);
      // console.log(d1, d2, d3);
      // drawGeo(ctx, p1, { fillStyle: "#d0021b", size: 2 });
      // drawGeo(ctx, p2, { fillStyle: "#d0021b", size: 2 });
    },
    false
  );
}
