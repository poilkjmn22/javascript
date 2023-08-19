import * as d3 from "d3";
import { drawStepsChart } from "./HandleSteps/index";

function pieChart(elModules) {
  //Width and height
  const w = elModules.clientHeight;
  const h = elModules.clientHeight;

  const dataset = [5, 10, 20, 45, 6, 25];
  const pie = d3.pie();

  const outerRadius = w / 2;
  const innerRadius = w / 3;
  const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

  //Easy colors accessible via a 10-step ordinal scale
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  //Create SVG element
  const svg = d3
    .select(elModules)
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  //Set up groups
  const arcs = svg
    .selectAll("g.arc")
    .data(pie(dataset))
    .enter()
    .append("g")
    .attr("class", "arc")
    .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

  //Draw arc paths
  arcs
    .append("path")
    .attr("fill", (d, i) => color(i))
    .attr("d", arc);

  //Labels
  arcs
    .append("text")
    .attr("transform", (d) => "translate(" + arc.centroid(d) + ")")
    .attr("text-anchor", "middle")
    .text((d) => d.value);
}

function stackChart(elModules) {
  //Width and height
  const w = elModules.clientWidth;
  const h = elModules.clientHeight;

  //Original data
  const dataset = [
    { apples: 5, oranges: 10, grapes: 22 },
    { apples: 4, oranges: 12, grapes: 28 },
    { apples: 2, oranges: 19, grapes: 32 },
    { apples: 7, oranges: 23, grapes: 35 },
    { apples: 23, oranges: 17, grapes: 43 },
  ];

  //Set up stack method
  const stack = d3
    .stack()
    .keys(["apples", "oranges", "grapes"])
    .order(d3.stackOrderDescending); // <-- Flipped stacking order

  //Data, stacked
  const series = stack(dataset);
  console.log(series);

  //Set up scales
  const xScale = d3
    .scaleBand()
    .domain(d3.range(dataset.length))
    .range([0, w])
    .paddingInner(0.05);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, (d) => d.apples + d.oranges + d.grapes)])
    .range([h, 0]); // <-- Flipped vertical scale

  //Easy colors accessible via a 10-step ordinal scale
  const colors = d3.scaleOrdinal(d3.schemeCategory10);

  //Create SVG element
  const svg = d3
    .select(elModules)
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  // Add a group for each row of data
  const groups = svg
    .selectAll("g")
    .data(series)
    .enter()
    .append("g")
    .style("fill", (d, i) => colors(i));

  // Add a rect for each data value
  groups
    .selectAll("rect")
    .data((d) => d)
    .enter()
    .append("rect")
    .attr("x", (d, i) => xScale(i))
    .attr("y", (d) => yScale(d[1]))
    .attr("height", (d) => yScale(d[0]) - yScale(d[1]))
    .attr("width", xScale.bandwidth());
}

function forceChart(elModules) {
  //Width and height
  const w = elModules.clientWidth;
  const h = elModules.clientHeight;

  //Original data
  const dataset = {
    nodes: [
      { name: "Adam" },
      { name: "Bob" },
      { name: "Carrie" },
      { name: "Donovan" },
      { name: "Edward" },
      { name: "Felicity" },
      { name: "George" },
      { name: "Hannah" },
      { name: "Iris" },
      { name: "Jerry" },
    ],
    edges: [
      { source: 0, target: 1 },
      { source: 0, target: 2 },
      { source: 0, target: 3 },
      { source: 0, target: 4 },
      { source: 1, target: 5 },
      { source: 2, target: 5 },
      { source: 2, target: 5 },
      { source: 3, target: 4 },
      { source: 5, target: 8 },
      { source: 5, target: 9 },
      { source: 6, target: 7 },
      { source: 7, target: 8 },
      { source: 8, target: 9 },
    ],
  };

  //Initialize a simple force layout, using the nodes and edges in dataset
  const force = d3
    .forceSimulation(dataset.nodes)
    .force("charge", d3.forceManyBody())
    .force("link", d3.forceLink(dataset.edges))
    .force(
      "center",
      d3
        .forceCenter()
        .x(w / 2)
        .y(h / 2)
    );

  const colors = d3.scaleOrdinal(d3.schemeCategory10);

  //Create SVG element
  const svg = d3
    .select(elModules)
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  //Create edges as lines
  const edges = svg
    .selectAll("line")
    .data(dataset.edges)
    .enter()
    .append("line")
    .style("stroke", "red")
    .style("stroke-width", 1);

  //Create nodes as circles
  const nodes = svg
    .selectAll("circle")
    .data(dataset.nodes)
    .enter()
    .append("circle")
    .attr("r", 10)
    .style("fill", (d, i) => colors(i))
    .call(
      d3
        .drag() //Define what to do on drag events
        .on("start", dragStarted)
        .on("drag", dragging)
        .on("end", dragEnded)
    );

  //Add a simple tooltip
  nodes.append("title").text((d) => d.name);

  //Every time the simulation "ticks", this will be called
  force.on("tick", () => {
    edges
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    nodes.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
  });

  //Define drag event functions
  function dragStarted(event, d) {
    if (!event.active) force.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragging(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragEnded(event, d) {
    if (!event.active) force.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
}

function stepsChart(elModules) {
  drawStepsChart(elModules, [
    { text: "开始" },
    {
      substeps: [
        { text: "步骤1的子步骤1-1" },
        { text: "步骤1的子步骤1-2" },
        { text: "步骤1的子步骤1-3" },
      ],
    },
    {
      substeps: [
        { text: "步骤2的子步骤2-1" },
        {
          substeps: [
            { text: "步骤2的孙子步骤2-2-1" },
            { text: "步骤2的孙子步骤2-2-2" },
            {
              text: "步骤2的孙子步骤2-2-3",
              substeps: [
                { text: "步骤2的子步骤2-1" },
                {
                  substeps: [
                    { text: "步骤2的孙子步骤2-2-1" },
                    { text: "步骤2的孙子步骤2-2-2" },
                    { text: "步骤2的孙子步骤2-2-3" },
                  ],
                },
                { text: "步骤2的子步骤2-3" },
              ],
            },
          ],
        },
        { text: "步骤2的子步骤2-3" },
      ],
    },
    { text: "结束" },
  ]);
}
export { pieChart, stackChart, forceChart, stepsChart };
