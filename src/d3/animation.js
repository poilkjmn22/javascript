import * as d3 from "d3";
import { addEventToText, defineRectClipPath } from "./utils.js";

function drawBasicBarChart(elModules) {
  //Width and height
  const w = elModules.offsetWidth / 2;
  const h = elModules.offsetHeight / 4;
  const barPadding = 1;

  const dataset = [
    5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23,
    25,
  ];

  //Create SVG element
  const svg = d3
    .select(elModules)
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  svg
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * (w / dataset.length))
    .attr("y", (d) => h - d * 4)
    .attr("width", w / dataset.length - barPadding)
    .attr("height", (d) => d * 4)
    .attr("fill", (d) => `rgb(0, 0, ${Math.round(d * 10)} )`);

  svg
    .selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text((d) => d)
    .attr("text-anchor", "middle")
    .attr(
      "x",
      (d, i) => i * (w / dataset.length) + (w / dataset.length - barPadding) / 2
    )
    .attr("y", (d) => h - d * 4 + 14)
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white");
}

function drawBasicBarChartWidthScaleBand(elModules) {
  //Width and height
  const w = elModules.offsetWidth;
  const h = elModules.offsetHeight;

  const dataset = [
    5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23,
    25,
  ];

  const xScale = d3
    .scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([0, w])
    .paddingInner(0.05);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, h]);

  //Create SVG element
  const svg = d3
    .select(elModules)
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  //Create bars
  svg
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", (d, i) => xScale(i))
    .attr("y", (d) => h - yScale(d))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => yScale(d))
    .attr("fill", (d) => `rgb(0, 0, ${Math.round(d * 10)})`);

  //Create labels
  svg
    .selectAll("text")
    .data(dataset)
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

function updateAllData(elModules) {
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
    .attr("fill", (d) => `rgb(0, 0, ${Math.round(d * 10)})`);

  //Create labels
  svg
    .selectAll("text")
    .data(initDataset)
    .enter()
    .append("text")
    .text(function (d) {
      return d;
    })
    .attr("text-anchor", "middle")
    .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
    .attr("y", (d) => h - yScale(d) + 14)
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white");

  //On click, update with new data
  addEventToText(svg, "click", function () {
    //New values for dataset
    const numValues = initDataset.length;
    const maxValue = 1000;
    const dataset = [];
    for (let i = 0; i < numValues; i++) {
      //Loop numValues times
      const newNumber = Math.floor(Math.random() * maxValue);
      dataset.push(newNumber); //Add new number to array
    }

    yScale.domain([0, d3.max(dataset)]);

    //Update all rects
    svg
      .selectAll("rect")
      .data(dataset)
      .transition()
      .ease(d3.easeCircleIn)
      .delay((d, i) => (i / dataset.length) * 100)
      .duration(1000)
      .attr("y", (d) => h - yScale(d))
      .attr("height", (d) => yScale(d));

    //Update all labels
    svg
      .selectAll("text")
      .data(dataset)
      .text((d) => d)
      .transition()
      .ease(d3.easeCircleIn)
      .delay((d, i) => (i / dataset.length) * 100)
      .duration(1000)
      .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
      .attr("y", (d) => h - yScale(d) + 14);
  });
}

function drawAxes(elModules) {
  //Width and height
  const w = elModules.offsetWidth;
  const h = elModules.offsetHeight;
  const padding = 30;

  //Dynamic, random dataset
  const initDataset = []; //Initialize empty array
  const numDataPoints = 50; //Number of dummy data points to create
  const xRange = Math.random() * 1000; //Max range of new x values
  const yRange = Math.random() * 1000; //Max range of new y values
  for (let i = 0; i < numDataPoints; i++) {
    //Loop numDataPoints times
    const newNumber1 = Math.floor(Math.random() * xRange); //New random integer
    const newNumber2 = Math.floor(Math.random() * yRange); //New random integer
    initDataset.push([newNumber1, newNumber2]); //Add new number to array
  }

  //Create scale functions
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(initDataset, (d) => d[0])])
    .range([padding, w - padding * 2]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(initDataset, (d) => d[1])])
    .range([h - padding, padding]);

  const aScale = d3
    .scaleSqrt()
    .domain([0, d3.max(initDataset, (d) => d[1])])
    .range([0, 10]);

  //Define X axis
  const xAxis = d3.axisBottom().scale(xScale).ticks(5);

  //Define Y axis
  const yAxis = d3.axisLeft().scale(yScale).ticks(5);

  //Create SVG element
  const svg = d3
    .select(elModules)
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  //Create circles
  svg
    .selectAll("circle")
    .data(initDataset)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d[0]))
    .attr("cy", (d) => yScale(d[1]))
    .attr("r", (d) => aScale(d[1]));

  //Create X axis
  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0,${h - padding})`)
    .call(xAxis);

  //Create Y axis
  svg
    .append("g")
    .attr("class", "y axis")
    .attr("transform", `translate(${padding}, 0)`)
    .call(yAxis);

  addEventToText(svg, "click", function () {
    //New values for dataset
    const numValues = initDataset.length; //Count original length of dataset
    const maxRange = Math.random() * 1000; //Max range of new values
    const dataset = []; //Initialize empty array
    for (let i = 0; i < numValues; i++) {
      //Loop numValues times
      const newNumber1 = Math.floor(Math.random() * maxRange); //New random integer
      const newNumber2 = Math.floor(Math.random() * maxRange); //New random integer
      dataset.push([newNumber1, newNumber2]); //Add new number to array
    }

    //Update scale domains
    xScale.domain([0, d3.max(dataset, (d) => d[0])]);
    yScale.domain([0, d3.max(dataset, (d) => d[1])]);

    //Update all circles
    svg
      .selectAll("circle")
      .data(dataset)
      .transition()
      .duration(1000)
      .on("start", function () {
        d3.select(this).attr("fill", "magenta");
      })
      .attr("cx", (d) => xScale(d[0]))
      .attr("cy", (d) => yScale(d[1]))
      .attr("r", (d) => aScale(d[1]))
      .transition()
      .duration(1000)
      .attr("fill", "black");

    //Update X axis
    svg.select(".x.axis").transition().duration(1000).call(xAxis);

    //Update Y axis
    svg.select(".y.axis").transition().duration(1000).call(yAxis);
  });
}

function useClipPath(elModules) {
  //Width and height
  const w = elModules.offsetWidth;
  const h = elModules.offsetHeight;
  const padding = 30;

  //Dynamic, random dataset
  const initDataset = []; //Initialize empty array
  const numDataPoints = 50; //Number of dummy data points to create
  const xRange = Math.random() * 1000; //Max range of new x values
  const yRange = Math.random() * 1000; //Max range of new y values
  for (let i = 0; i < numDataPoints; i++) {
    //Loop numDataPoints times
    const newNumber1 = Math.floor(Math.random() * xRange); //New random integer
    const newNumber2 = Math.floor(Math.random() * yRange); //New random integer
    initDataset.push([newNumber1, newNumber2]); //Add new number to array
  }

  //Create scale functions
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(initDataset, (d) => d[0])])
    .range([padding, w - padding * 2]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(initDataset, (d) => d[1])])
    .range([h - padding, padding]);

  const aScale = d3
    .scaleSqrt()
    .domain([0, d3.max(initDataset, (d) => d[1])])
    .range([0, 10]);

  //Define X axis
  const xAxis = d3.axisBottom().scale(xScale).ticks(5);

  //Define Y axis
  const yAxis = d3.axisLeft().scale(yScale).ticks(5);

  //Create SVG element
  const svg = d3
    .select(elModules)
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  // create clip-path
  const rectClipPathUrl = "chart-area";
  defineRectClipPath(svg, w, h, padding, rectClipPathUrl);

  //Create circles
  svg
    .append("g")
    .attr("id", "circles")
    .attr("clip-path", `url(#${rectClipPathUrl})`)
    .selectAll("circle")
    .data(initDataset)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d[0]))
    .attr("cy", (d) => yScale(d[1]))
    .attr("r", (d) => aScale(d[1]));

  //Create X axis
  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0,${h - padding})`)
    .call(xAxis);

  //Create Y axis
  svg
    .append("g")
    .attr("class", "y axis")
    .attr("transform", `translate(${padding}, 0)`)
    .call(yAxis);

  addEventToText(svg, "click", function () {
    //New values for dataset
    const numValues = initDataset.length; //Count original length of dataset
    const maxRange = Math.random() * 1000; //Max range of new values
    const dataset = []; //Initialize empty array
    for (let i = 0; i < numValues; i++) {
      //Loop numValues times
      const newNumber1 = Math.floor(Math.random() * maxRange); //New random integer
      const newNumber2 = Math.floor(Math.random() * maxRange); //New random integer
      dataset.push([newNumber1, newNumber2]); //Add new number to array
    }

    //Update scale domains
    xScale.domain([0, d3.max(dataset, (d) => d[0])]);
    yScale.domain([0, d3.max(dataset, (d) => d[1])]);

    //Update all circles
    svg
      .selectAll("circle")
      .data(dataset)
      .transition()
      .duration(1000)
      .on("start", function () {
        d3.select(this).attr("fill", "magenta");
      })
      .attr("cx", (d) => xScale(d[0]))
      .attr("cy", (d) => yScale(d[1]))
      .attr("r", (d) => aScale(d[1]))
      .transition()
      .duration(1000)
      .attr("fill", "black");

    //Update X axis
    svg.select(".x.axis").transition().duration(1000).call(xAxis);

    //Update Y axis
    svg.select(".y.axis").transition().duration(1000).call(yAxis);
  });
}

function addData(elModules) {
  //Width and height
  const w = elModules.offsetWidth;
  const h = elModules.offsetHeight;
  const padding = 50;

  const dataset = [
    5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23,
    25,
  ];

  const xScale = d3
    .scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([padding, w - padding])
    .paddingInner(0.05);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset)])
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
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", (d, i) => xScale(i))
    .attr("y", (d) => h - yScale(d))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => yScale(d))
    .attr("fill", (d) => `rgb(0, 0, ${Math.round(d * 10)})`);

  //Create labels
  svg
    .selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text((d) => d)
    .attr("class", "label")
    .attr("text-anchor", "middle")
    .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
    .attr("y", (d) => h - yScale(d) + 14)
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white");

  //On click, update with new data
  addEventToText(svg, "click", function () {
    //Add one new value to dataset
    const maxValue = 25;
    const newNumber = Math.floor(Math.random() * maxValue); //New random integer (0-24)
    dataset.push(newNumber); //Add new number to array

    xScale.domain(d3.range(dataset.length));
    yScale.domain([0, d3.max(dataset)]);

    const bars = svg.selectAll("rect").data(dataset);

    //add enter data
    bars
      .enter()
      .append("rect")
      .attr("x", w)
      .attr("y", (d) => h - yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => yScale(d))
      .attr("fill", (d) => `rgb(0, 0, ${Math.round(d * 10)})`)
      .merge(bars)
      .transition()
      .ease(d3.easeCircleIn)
      .delay((d, i) => (i / dataset.length) * 100)
      .duration(1000)
      .attr("x", (d, i) => xScale(i))
      .attr("y", (d) => h - yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => yScale(d));

    const texts = svg.selectAll(".label").data(dataset);
    //add enter label
    texts
      .enter()
      .append("text")
      .text((d) => d)
      .attr("class", "label")
      .attr("text-anchor", "middle")
      .attr("x", w)
      .attr("y", (d) => h - yScale(d) + 14)
      .attr("font-family", "sans-serif")
      .attr("font-size", "11px")
      .attr("fill", "white")
      .merge(texts)
      .transition()
      .ease(d3.easeCircleIn)
      .delay((d, i) => (i / dataset.length) * 100)
      .duration(1000)
      .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
      .attr("y", (d) => h - yScale(d) + 14);
  });
}

function removeData(elModules) {
  //Width and height
  const w = elModules.offsetWidth;
  const h = elModules.offsetHeight;
  const padding = 50;

  const dataset = [
    5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23,
    25,
  ].map((d, i) => ({ key: i, value: d }));
  const key = (d) => d.key;

  const xScale = d3
    .scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([padding, w - padding])
    .paddingInner(0.05);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, (d) => d.value)])
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
    .data(dataset, key)
    .enter()
    .append("rect")
    .attr("x", (d, i) => xScale(i))
    .attr("y", (d) => h - yScale(d.value))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => yScale(d.value))
    .attr("fill", (d) => `rgb(0, 0, ${Math.round(d.value * 10)})`);

  //Create labels
  svg
    .selectAll("text")
    .data(dataset, key)
    .enter()
    .append("text")
    .text((d) => d.value)
    .attr("class", "label")
    .attr("text-anchor", "middle")
    .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
    .attr("y", (d) => h - yScale(d.value) + 14)
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white");

  //On click, update with new data
  addEventToText(
    svg,
    "click",
    function () {
      dataset.shift();

      xScale.domain(d3.range(dataset.length));
      yScale.domain([0, d3.max(dataset, (d) => d.value)]);

      const bars = svg.selectAll("rect").data(dataset, key);

      //add enter data
      bars
        .enter()
        .append("rect")
        .attr("x", w)
        .attr("y", (d) => h - yScale(d.value))
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => yScale(d.value))
        .attr("fill", (d) => `rgb(0, 0, ${Math.round(d.value * 10)})`)
        .merge(bars)
        .transition()
        .ease(d3.easeCircleIn)
        .delay((d, i) => (i / dataset.length) * 100)
        .duration(1000)
        .attr("x", (d, i) => xScale(i))
        .attr("y", (d) => h - yScale(d.value))
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => yScale(d.value))
        .attr("fill", (d) => `rgb(0, 0, ${Math.round(d.value * 10)})`);

      bars
        .exit()
        .transition()
        .duration(500)
        .attr("x", -xScale.bandwidth())
        .remove();

      const texts = svg.selectAll(".label").data(dataset, key);
      //add enter label
      texts
        .enter()
        .append("text")
        .text((d) => d.value)
        .attr("class", "label")
        .attr("text-anchor", "middle")
        .attr("x", w)
        .attr("y", (d) => h - yScale(d.value) + 14)
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "white")
        .merge(texts)
        .transition()
        .ease(d3.easeCircleIn)
        .delay((d, i) => (i / dataset.length) * 100)
        .duration(1000)
        .text((d) => d.value)
        .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
        .attr("y", (d) => h - yScale(d.value) + 14);
      texts
        .exit()
        .transition()
        .duration(500)
        .attr("x", -xScale.bandwidth())
        .remove();
    },
    "Click on this text to remove a data value from the chart!"
  );
}

function addAndRemove(elModules) {
  //Width and height
  const w = elModules.offsetWidth;
  const h = elModules.offsetHeight;
  const padding = 50;

  const dataset = [
    5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23,
    25,
  ].map((d, i) => ({ key: i, value: d }));
  const key = (d) => d.key;

  const xScale = d3
    .scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([padding, w - padding])
    .paddingInner(0.05);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, (d) => d.value)])
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
    .data(dataset, key)
    .enter()
    .append("rect")
    .attr("x", (d, i) => xScale(i))
    .attr("y", (d) => h - yScale(d.value))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => yScale(d.value))
    .attr("fill", (d) => `rgb(0, 0, ${Math.round(d.value * 10)})`);

  //Create labels
  svg
    .selectAll("text")
    .data(dataset, key)
    .enter()
    .append("text")
    .text((d) => d.value)
    .attr("class", "label")
    .attr("text-anchor", "middle")
    .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
    .attr("y", (d) => h - yScale(d.value) + 14)
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white");

  //On click, update with new data
  addEventToText(svg, "click", handleAddAndRemove, "Add a new data value");
  addEventToText(svg, "click", handleAddAndRemove, "Remove a data value").attr(
    "y",
    60
  );

  function handleAddAndRemove() {
    const m = d3
      .select(this)
      .text()
      .match(/(add|remove)/i);
    const actionType = m && m[1] && m[1].toLowerCase();
    if (actionType === "add") {
      //Add a data value
      const minValue = 2;
      const maxValue = 25 - minValue;
      const newNumber = Math.floor(Math.random() * maxValue) + minValue;
      const lastKey = dataset[dataset.length - 1].key;
      dataset.push({
        key: lastKey + 1,
        value: newNumber,
      });
    } else if (actionType === "remove") {
      //Remove a value
      dataset.shift(); //Remove one value from dataset
    }

    xScale.domain(d3.range(dataset.length));
    yScale.domain([0, d3.max(dataset, (d) => d.value)]);

    const bars = svg.selectAll("rect").data(dataset, key);

    //add enter data
    bars
      .enter()
      .append("rect")
      .attr("x", w)
      .attr("y", (d) => h - yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => yScale(d.value))
      .attr("fill", (d) => `rgb(0, 0, ${Math.round(d.value * 10)})`)
      .merge(bars)
      .transition()
      .ease(d3.easeCircleIn)
      .delay((d, i) => (i / dataset.length) * 100)
      .duration(1000)
      .attr("x", (d, i) => xScale(i))
      .attr("y", (d) => h - yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => yScale(d.value))
      .attr("fill", (d) => `rgb(0, 0, ${Math.round(d.value * 10)})`);

    bars
      .exit()
      .transition()
      .duration(500)
      .attr("x", -xScale.bandwidth())
      .remove();

    const texts = svg.selectAll(".label").data(dataset, key);
    //add enter label
    texts
      .enter()
      .append("text")
      .text((d) => d.value)
      .attr("class", "label")
      .attr("text-anchor", "middle")
      .attr("x", w)
      .attr("y", (d) => h - yScale(d.value) + 14)
      .attr("font-family", "sans-serif")
      .attr("font-size", "11px")
      .attr("fill", "white")
      .merge(texts)
      .transition()
      .ease(d3.easeCircleIn)
      .delay((d, i) => (i / dataset.length) * 100)
      .duration(1000)
      .text((d) => d.value)
      .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
      .attr("y", (d) => h - yScale(d.value) + 14);
    texts
      .exit()
      .transition()
      .duration(500)
      .attr("x", -xScale.bandwidth())
      .remove();
  }
}

export {
  drawBasicBarChart,
  drawBasicBarChartWidthScaleBand,
  updateAllData,
  drawAxes,
  useClipPath,
  addData,
  removeData,
  addAndRemove,
};
