import React from "react";
import axios from "axios";
import * as d3 from "d3";
import { reduce } from "lodash-es";
import "./statistic-analysis.css";

class StatisticAnalysis extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={this.props.name}>
        <div className="chart-box">
          <svg id="statistic-chart-box"></svg>
        </div>
      </div>
    );
  }
  async componentDidMount() {
    const { data: res } = await axios.post("/api/bug-record/statistic");
    const data = reduce(
      res,
      (res, v, k) => {
        res.push({
          name: k,
          value: v.length,
        });
        return res;
      },
      []
    ).sort((a, b) => d3.descending(a.value, b.value));
    Object.assign(data, { format: ".0", y: "↑ 数量" });

    const { clientWidth: width, clientHeight: height } =
      document.getElementById("statistic-chart-box");

    const margin = { top: 30, right: 0, bottom: 30, left: 40 };
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

    const svg = d3.select("#statistic-chart-box");

    svg
      .append("g")
      .attr("fill", color)
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", (d) => y(d.value))
      .attr("height", (d) => y(0) - y(d.value))
      .attr("width", x.bandwidth());

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
}
StatisticAnalysis.defaultProps = {
  name: "statistic-analysis",
};

export default StatisticAnalysis;
