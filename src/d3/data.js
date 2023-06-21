import * as d3 from "d3";

function drawDataParagraph(elModules) {
  var dataset = [5, 10, 15, 20, 25];

  d3.select(elModules)
    .selectAll("p")
    .data(dataset)
    .enter()
    .append("p")
    .style("color", (d) => (d > 15 ? "red" : "black"))
    .text((d) => `I can count up to ${d}`);
  // .text("New paragraph!");
}

async function loadCsv() {
  function rowConverter(d) {
    return {
      Food: d.Food,
      Deliciousness: parseFloat(d.Deliciousness),
    };
  }
  const data = await d3.csv("d3-book/food.csv", rowConverter);
  console.table(data);
}

export { drawDataParagraph, loadCsv };
