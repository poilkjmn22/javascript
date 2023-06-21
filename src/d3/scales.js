import * as d3 from "d3";
function scaleLinear(elModules) {
  //Width and height
  const w = elModules.offsetWidth;
  const h = elModules.offsetHeight;
  const padding = 20;

  const dataset = [
    [5, 20],
    [480, 90],
    [250, 50],
    [100, 33],
    [330, 95],
    [410, 12],
    [475, 44],
    [25, 67],
    [85, 21],
    [220, 88],
    [600, 150],
  ];

  //Create scale functions
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, (d) => d[0])])
    .range([padding, w - padding]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, (d) => d[1])])
    .range([h - padding, padding]);

  const aScale = d3
    .scaleSqrt()
    .domain([0, d3.max(dataset, (d) => d[1])])
    .range([0, 15]);

  //Create SVG element
  const svg = d3
    .select(elModules)
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  //Create circles
  svg
    .selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d[0]))
    .attr("cy", (d) => yScale(d[1]))
    .attr("r", (d) => aScale(d[1]));

  //Create labels
  svg
    .selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text((d) => `${d[0]},${d[1]}`)
    .attr("x", (d) => xScale(d[0]))
    .attr("y", (d) => yScale(d[1]))
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "red");
}

async function scaleTime(elModules) {
  const w = elModules.offsetWidth;
  const h = elModules.offsetHeight;
  const padding = 40;

  //For converting strings to Dates
  const parseTime = d3.timeParse("%m/%d/%y");

  //For converting Dates to strings
  const formatTime = d3.timeFormat("%b %e");

  //Function for converting CSV values from strings to Dates and numbers
  const rowConverter = function (d) {
    return {
      Date: parseTime(d.Date),
      Amount: parseInt(d.Amount),
    };
  };

  //Load in the data
  const dataset = await d3
    .csv("d3-book/time_scale_data.csv", rowConverter)
    .catch(console.error);
  if (!dataset) {
    throw new Error("加载csv文件错误！");
  }

  //Create scale functions
  const xScale = d3
    .scaleTime()
    .domain([d3.min(dataset, (d) => d.Date), d3.max(dataset, (d) => d.Date)])
    .range([padding, w - padding]);

  const yScale = d3
    .scaleLinear()
    .domain([
      d3.min(dataset, (d) => d.Amount),
      d3.max(dataset, (d) => d.Amount),
    ])
    .range([h - padding, padding]);

  //Create SVG element
  const svg = d3
    .select(elModules)
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  //Generate date labels first, so they are in back
  svg
    .selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text((d) => formatTime(d.Date))
    .attr("x", (d) => xScale(d.Date) + 4)
    .attr("y", (d) => yScale(d.Amount) + 4)
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "red");

  //Generate circles last, so they appear in front
  svg
    .selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d.Date))
    .attr("cy", (d) => yScale(d.Amount))
    .attr("r", 10);
}

export { scaleLinear, scaleTime };
