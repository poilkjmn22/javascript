import * as d3 from "d3";
function drawAxes(elModules) {
  //Width and height
  const w = elModules.offsetWidth;
  const h = elModules.offsetHeight;
  const padding = 30;

  /*
			//Static dataset
			const dataset = [
							[5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
							[410, 12], [475, 44], [25, 67], [85, 21], [220, 88],
							[600, 150]
						  ];
			*/

  //Dynamic, random dataset
  const dataset = []; //Initialize empty array
  const numDataPoints = 50; //Number of dummy data points to create
  const xRange = Math.random() * 1000; //Max range of new x values
  const yRange = Math.random() * 1000; //Max range of new y values
  for (let i = 0; i < numDataPoints; i++) {
    //Loop numDataPoints times
    const newNumber1 = Math.floor(Math.random() * xRange); //New random integer
    const newNumber2 = Math.floor(Math.random() * yRange); //New random integer
    dataset.push([newNumber1, newNumber2]); //Add new number to array
  }

  //Create scale functions
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, (d) => d[0])])
    .range([padding, w - padding * 2]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, (d) => d[1])])
    .range([h - padding, padding]);

  const aScale = d3
    .scaleSqrt()
    .domain([0, d3.max(dataset, (d) => d[1])])
    .range([0, 10]);

  const formatAsPercentage = d3.format(".1%");

  //Define X axis
  const xAxis = d3
    .axisBottom()
    .scale(xScale)
    .ticks(5)
    .tickFormat((d) => d);

  //Define Y axis
  const yAxis = d3
    .axisLeft()
    .scale(yScale)
    .ticks(5)
    .tickFormat(formatAsPercentage);

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

  /*
			//Create labels
			svg.selectAll("text")
			   .data(dataset)
			   .enter()
			   .append("text")
			   .text(d => `${d[0]},${d[1]}`)
			   .attr("x", d => xScale(d[0]))
			   .attr("y", d => yScale(d[1]))
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "11px")
			   .attr("fill", "red");
		  	*/

  //Create X axis
  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${h - padding})`)
    .call(xAxis);

  //Create Y axis
  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(${padding}, 0)`)
    .call(yAxis);
}

async function drawAxesTime(elModules) {
  //Width and height
  const w = elModules.offsetWidth;
  const h = elModules.offsetHeight;
  const padding = 40;

  //For converting strings to Dates
  const parseTime = d3.timeParse("%m/%d/%y");

  //For converting Dates to strings
  const formatTime = d3.timeFormat("%e");

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
    return;
  }

  const startDate = d3.min(dataset, (d) => d.Date);
  const endDate = d3.max(dataset, (d) => d.Date);
  //Create scale functions
  const xScale = d3
    .scaleTime()
    .domain([d3.timeDay.offset(startDate, -1), d3.timeDay.offset(endDate, 1)])
    .range([padding, w - padding]);

  const yScale = d3
    .scaleLinear()
    .domain([
      d3.min(dataset, (d) => d.Amount),
      d3.max(dataset, (d) => d.Amount),
    ])
    .range([h - padding, padding]);

  //Define X axis
  const xAxis = d3.axisBottom().scale(xScale).ticks(9).tickFormat(formatTime);

  //Define Y axis
  const yAxis = d3.axisLeft().scale(yScale).ticks(10);

  //Create SVG element
  const svg = d3
    .select(elModules)
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  /*
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
    */

  //Generate guide lines
  svg
    .selectAll("line")
    .data(dataset)
    .enter()
    .append("line")
    .attr("x1", (d) => xScale(d.Date))
    .attr("x2", (d) => xScale(d.Date))
    .attr("y1", h - padding)
    .attr("y2", (d) => yScale(d.Amount))
    .attr("stroke", "green")
    .attr("stroke-dasharray", "5, 5")
    .attr("stroke-width", 1);
  //Generate circles last, so they appear in front
  svg
    .selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d.Date))
    .attr("cy", (d) => yScale(d.Amount))
    .attr("r", 5);

  //Create X axis
  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${h - padding})`)
    .call(xAxis);

  //Create Y axis
  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(${padding},0)`)
    .call(yAxis);
}

export { drawAxes, drawAxesTime };