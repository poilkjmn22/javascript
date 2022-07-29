import * as d3 from "d3";
import { isString, round } from "./util";

function drawBarChart(data, container, options = {}) {
  if (options.sort) {
    data.sort((a, b) => d3.descending(a.value, b.value));
  }
  Object.assign(data, { format: ".0", y: "↑ ms" });

  const elContainer = isString(container)
    ? document.getElementById(container)
    : container;
  const { clientWidth: width, clientHeight: height } = elContainer;

  const margin = { top: 30, right: 100, bottom: 30, left: 40 };
  const color = "tomato";

  const x = d3
    .scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)])
    .nice()
    .range([height - margin.bottom, margin.top]);

  const maxValue = d3.max(data, (d) => d.value);
  const tickCount = maxValue < 10 ? maxValue : 10;

  const svg = d3.select(elContainer).select("svg");

  svg
    .append("g")
    .attr("fill", color)
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr(
      "x",
      (d, i) => x(i) + (x.bandwidth() - Math.min(80, x.bandwidth())) / 2
    )
    .attr("y", (d) => y(d.value))
    .attr("height", (d) => y(0) - y(d.value))
    .attr("width", Math.min(80, x.bandwidth()));

  svg
    .append("g")
    .selectAll("text")
    .data(data)
    .join("text")
    .attr(
      "x",
      (d, i) => x(i) + (x.bandwidth() - Math.min(80, x.bandwidth())) / 2
    )
    .attr("y", (d) => y(d.value))
    .attr("fill", "currentColor")
    .attr("text-anchor", "start")
    .text((d) => round(d.value, 3));

  svg.append("g").call(xAxis);

  svg.append("g").call(yAxis);

  function xAxis(g) {
    g.attr("transform", `translate(0,${height - margin.bottom})`).call(
      d3
        .axisBottom(x)
        .tickFormat((i) => data[i].name)
        .tickSizeOuter(0)
    );
  }
  function yAxis(g) {
    g.attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(tickCount, data.format))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .append("text")
          .attr("x", -margin.left)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(data.y)
      );
  }
}

export { drawBarChart };
