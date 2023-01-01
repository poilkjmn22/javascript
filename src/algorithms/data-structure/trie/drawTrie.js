import IntTrie from "./IntTrie";
import { angleToRad } from "@/geometry/utils";
import * as d3 from "d3";

export function drawIntTrieByD3(elContainer) {
  const { offsetWidth, offsetHeight } = elContainer;
  const t1 = IntTrie.build({ 1: "a", 4: "b", 5: "c", 9: "d" });
  const svg = d3
    .create("svg")
    .attr("class", "svg-container")
    .attr("viewBox", [0, 0, offsetWidth, offsetHeight]);
  elContainer.appendChild(svg.node());

  const g = svg
    .append("g")
    .attr("class", "tree-container")
    .attr("font-family", "sans-serif")
    .attr("font-size", 20);

  const r = 20;
  const x0 = offsetWidth / 2;
  const y0 = r;
  const levelHeight = 120;
  const angle = 40;
  const mainColor = "#1A6EEA";
  const drawLine = (n1, n2, g, branch) => {
    const line = d3.line()([
      [n1.x, n1.y],
      [n2.x, n2.y],
    ]);
    const path = g
      .append("path")
      .attr("class", "join-line")
      .attr("d", line)
      .attr("fill", mainColor)
      .attr("stroke", mainColor)
      .attr("stroke-width", 2);
    const branchText = g
      .append("text")
      .attr("style", `font-size: 18px;stroke: #333;`)
      .attr("text-anchor", "end")
      .text(branch === "left" ? 0 : 1)
      .attr("x", (n1.x + n2.x) / 2)
      .attr("y", (n1.y + n2.y) / 2)
      .attr("stroke", "white");
  };
  const drawNode = (n, p, branch) => {
    if (!p) {
      n.x = x0;
      n.y = y0;
      n.level = 0;
    } else {
      n.level = p.level + 1;
    }
    if (branch === "left") {
      n.x = p.x - levelHeight * Math.tan(angleToRad(angle - n.level * 5));
      n.y = p.y + levelHeight;
      drawLine(p, n, g, branch);
    }
    if (branch === "right") {
      n.x = p.x + levelHeight * Math.tan(angleToRad(angle - n.level * 5));
      n.y = p.y + levelHeight;
      drawLine(p, n, g, branch);
    }
    const gn = g
      .append("g")
      .attr("class", "node-container")
      .datum(n)
      .attr("transform", `translate(${n.x}, ${n.y})`);
    gn.append("circle")
      .attr("fill", n.value ? mainColor : "#999")
      .attr("r", r)
      .attr("cursor", "pointer");
    gn.append("text")
      .attr("style", "font-size: 18px;fill: #fff;")
      .attr("text-anchor", "end")
      .text(n.value)
      .attr("dx", "0.5em")
      .attr("dy", "0.3em")
      .attr("stroke", "white");
  };

  t1.traverse(drawNode);
}
