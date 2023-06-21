import * as d3 from "d3";
import "./styles.css";

function sortBars(elModules) {
  //Width and height
  const w = elModules.offsetWidth;
  const h = elModules.offsetHeight;
  const padding = 50;

  const initDataset = [
    5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23,
    25,
  ];

  const xScale = d3
    .scaleBand()
    .domain(d3.range(initDataset.length))
    .rangeRound([padding, w - padding])
    .paddingInner(0.05);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(initDataset)])
    .range([padding, h - padding])
    .clamp(true);

  //Create SVG element
  const svg = d3
    .select(elModules)
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  let sortOrder = false;
  const sortBars = function () {
    //Flip value of sortOrder
    sortOrder = !sortOrder;

    svg
      .selectAll("rect")
      .sort((a, b) => (sortOrder ? d3.ascending(a, b) : d3.descending(a, b)))
      .transition()
      .delay((d, i) => i * 50)
      .duration(1000)
      .attr("x", (d, i) => xScale(i));

    svg
      .selectAll("text")
      .sort((a, b) => (sortOrder ? d3.ascending(a, b) : d3.descending(a, b)))
      .transition()
      .delay((d, i) => i * 50)
      .duration(1000)
      .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
      .attr("y", (d) => h - yScale(d) + 14);
  };
  //Create bars
  svg
    .selectAll("rect")
    .data(initDataset)
    .enter()
    .append("rect")
    .attr("x", (d, i) => xScale(i))
    .attr("y", (d) => h - yScale(d))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => yScale(d))
    .attr("fill", (d) => `rgb(0, 0, ${Math.round(d * 10)})`)
    .on("click", sortBars);

  //Create labels
  svg
    .selectAll("text")
    .data(initDataset)
    .enter()
    .append("text")
    .text((d) => d)
    .attr("text-anchor", "middle")
    .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
    .attr("y", (d) => h - yScale(d) + 14)
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white");
}

function svgTooltip(elModules) {
  //Width and height
  const w = elModules.offsetWidth;
  const h = elModules.offsetHeight;
  const padding = 50;

  const initDataset = [
    5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23,
    25,
  ];

  const xScale = d3
    .scaleBand()
    .domain(d3.range(initDataset.length))
    .rangeRound([padding, w - padding])
    .paddingInner(0.05);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(initDataset)])
    .range([padding, h - padding])
    .clamp(true);

  //Create SVG element
  const svg = d3
    .select(elModules)
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  //Create bars
  svg
    .selectAll("rect")
    .data(initDataset)
    .enter()
    .append("rect")
    .attr("x", (d, i) => xScale(i))
    .attr("y", (d) => h - yScale(d))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => yScale(d))
    .attr("fill", (d) => `rgb(0, 0, ${Math.round(d * 10)})`)
    .on("mouseover", function (e, d) {
      //Get this bar's x/y values, then augment for the tooltip
      var xPosition =
        parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
      var yPosition = h - yScale(d) / 2;

      //Create the tooltip label
      svg
        .append("text")
        .attr("id", "tooltip")
        .attr("x", xPosition)
        .attr("y", yPosition)
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("font-weight", "bold")
        .attr("fill", "black")
        .text(d);
    })
    .on("mouseout", function () {
      //Remove the tooltip
      d3.select("#tooltip").remove();
    });
}

function divTooltip(elModules) {
  //Width and height
  const w = elModules.offsetWidth;
  const h = elModules.offsetHeight;
  const padding = 50;

  const initDataset = [
    5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23,
    25,
  ];

  const xScale = d3
    .scaleBand()
    .domain(d3.range(initDataset.length))
    .rangeRound([padding, w - padding])
    .paddingInner(0.05);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(initDataset)])
    .range([padding, h - padding])
    .clamp(true);

  //Create SVG element
  const svg = d3
    .select(elModules)
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  // create tooltip
  const tooltip = d3
    .select(elModules)
    .append("div")
    .attr("id", "tooltip")
    .attr("class", "hidden")
    .html(`<p>Important label Heading</p><p><span id="value">100</span>%</p>`);

  //Create bars
  svg
    .selectAll("rect")
    .data(initDataset)
    .enter()
    .append("rect")
    .attr("x", (d, i) => xScale(i))
    .attr("y", (d) => h - yScale(d))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => yScale(d))
    .attr("fill", (d) => `rgb(0, 0, ${Math.round(d * 10)})`)
    .on("mouseover", function (e, d) {
      //Get this bar's x/y values, then augment for the tooltip
      var xPosition =
        parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
      var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + h / 2;

      //Update the tooltip position and value
      tooltip
        .style("left", xPosition + "px")
        .style("top", yPosition + "px")
        .select("#value")
        .text(d);

      //Show the tooltip
      tooltip.classed("hidden", false);
    })
    .on("mouseout", function () {
      //Hide the tooltip
      tooltip.classed("hidden", true);
    });
}

export { sortBars, svgTooltip, divTooltip };
