import * as d3 from "d3";
import "./styles.css";

async function lineChart(elModules) {
  //Width and height
  const w = elModules.clientWidth;
  const h = elModules.clientHeight;
  const padding = 40;

  //For converting Dates to strings
  const formatTime = d3.timeFormat("%Y");

  //Function for converting CSV values from strings to Dates and numbers
  const rowConverter = function (d) {
    return {
      date: new Date(+d.year, +d.month - 1), //Make a new Date object for each year + month
      average: parseFloat(d.average), //Convert from string to float
    };
  };

  //Load in data
  const dataset = await d3
    .csv("d3-book/mauna_loa_co2_monthly_averages.csv", rowConverter)
    .catch(console.error);
  if (!dataset) {
    return;
  }

  // Print data to console as table, for verification
  // console.table(dataset, ["date", "average"]);

  //Create scale functions
  const xScale = d3
    .scaleTime()
    .domain([d3.min(dataset, (d) => d.date), d3.max(dataset, (d) => d.date)])
    .range([padding, w]);

  const yScale = d3
    .scaleLinear()
    .domain([
      d3.min(dataset, (d) => (d.average >= 0 ? d.average : undefined)) - 10,
      d3.max(dataset, (d) => d.average),
    ])
    .range([h - padding, 0]);

  //Define axes
  const xAxis = d3.axisBottom().scale(xScale).ticks(10).tickFormat(formatTime);

  //Define Y axis
  const yAxis = d3.axisLeft().scale(yScale).ticks(10);

  //Define line generators
  const line = d3
    .line()
    .defined((d) => d.average >= 0 && d.average <= 350)
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.average));

  const dangerLine = d3
    .line()
    .defined((d) => d.average >= 350)
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.average));

  //Create SVG element
  const svg = d3
    .select(elModules)
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  //Create lines
  svg.append("path").datum(dataset).attr("class", "line").attr("d", line);

  svg
    .append("path")
    .datum(dataset)
    .attr("class", "line danger")
    .attr("d", dangerLine);

  //Create axes
  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis);

  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);

  //Draw 350 ppm line
  svg
    .append("line")
    .attr("class", "line safeLevel")
    .attr("x1", padding)
    .attr("x2", w)
    .attr("y1", yScale(350))
    .attr("y2", yScale(350));

  //Label 350 ppm line
  svg
    .append("text")
    .attr("class", "dangerLabel")
    .attr("x", padding + 20)
    .attr("y", yScale(350) - 7)
    .text("350 ppm “safe” level");
}

async function areaChart(elModules) {
  //Width and height
  const w = elModules.clientWidth;
  const h = elModules.clientHeight;
  const padding = 40;

  //For converting Dates to strings
  const formatTime = d3.timeFormat("%Y");

  //Function for converting CSV values from strings to Dates and numbers
  const rowConverter = function (d) {
    return {
      date: new Date(+d.year, +d.month - 1), //Make a new Date object for each year + month
      average: parseFloat(d.average), //Convert from string to float
    };
  };

  //Load in data
  const dataset = await d3
    .csv("d3-book/mauna_loa_co2_monthly_averages.csv", rowConverter)
    .catch(console.error);
  if (!dataset) {
    return;
  }

  // Print data to console as table, for verification
  // console.table(dataset, ["date", "average"]);

  //Create scale functions
  const xScale = d3
    .scaleTime()
    .domain([d3.min(dataset, (d) => d.date), d3.max(dataset, (d) => d.date)])
    .range([padding, w]);

  const yScale = d3
    .scaleLinear()
    .domain([
      d3.min(dataset, (d) => (d.average >= 0 ? d.average : undefined)) - 10,
      d3.max(dataset, (d) => d.average),
    ])
    .range([h - padding, 0]);

  //Define axes
  const xAxis = d3.axisBottom().scale(xScale).ticks(10).tickFormat(formatTime);

  //Define Y axis
  const yAxis = d3.axisLeft().scale(yScale).ticks(10);

  //Define area generators
  const area = d3
    .area()
    .defined((d) => d.average >= 0)
    .x((d) => xScale(d.date))
    .y0(() => yScale.range()[0])
    .y1((d) => yScale(d.average));

  const dangerArea = d3
    .area()
    .defined((d) => d.average >= 350)
    .x((d) => xScale(d.date))
    .y0(() => yScale(350))
    .y1((d) => yScale(d.average));

  //Create SVG element
  const svg = d3
    .select(elModules)
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  //Create areas
  svg.append("path").datum(dataset).attr("class", "area").attr("d", area);

  svg
    .append("path")
    .datum(dataset)
    .attr("class", "area danger")
    .attr("d", dangerArea);

  //Create axes
  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis);

  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);

  //Draw 350 ppm line
  svg
    .append("line")
    .attr("class", "line safeLevel")
    .attr("x1", padding)
    .attr("x2", w)
    .attr("y1", yScale(350))
    .attr("y2", yScale(350));

  //Label 350 ppm line
  svg
    .append("text")
    .attr("class", "dangerLabel")
    .attr("x", padding + 20)
    .attr("y", yScale(350) - 7)
    .text("350 ppm “safe” level");
}

export { lineChart, areaChart };
