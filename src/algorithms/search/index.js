import { nTimes, random } from "@/utils/util";
import { linearSearch, binarySearch, binarySearchTree } from "./search";
import { drawBarChart } from "@/utils/d3Helper";
import { CSvg } from "@/utils/svg";
import BinarySearchTree from "@/algorithms/data-structure/binary-search-tree/BinarySearchTree";

// const Benchmark = require("benchmark");
export function search(elContainer) {
  let arr = [];
  const bst = new BinarySearchTree();
  for (const n of nTimes(10000)) {
    const d = random(0, 10000);
    arr.push(d);
    bst.insert(d);
  }
  // const suite = new Benchmark.Suite();
  // const statistics = [];
  // suite
    // .add("linearSearch", () => {
      // linearSearch(arr, 100);
    // })
    // .add("binarySearch", () => {
      // binarySearch(arr, 100);
    // })
    // .add("binarySearchTree", () => {
      // binarySearchTree(bst, 100);
    // })
    // .on("cycle", (e) => {
      // const { times, name } = e.target;
      // statistics.push({ name, value: times.period * 1000 });
    // })
    // .on("complete", function () {
      // console.log("Fastest is " + this.filter("fastest").map("name"));
      // let chartBox = elContainer.querySelector(".chart-box");
      // if (chartBox) {
        // chartBox.innerHTML = "";
      // } else {
        // chartBox = document.createElement("div");
        // chartBox.classList.add("chart-box");
        // chartBox.setAttribute("style", "height: 400px");
        // elContainer.appendChild(chartBox);
      // }
// 
      // chartBox.appendChild(CSvg());
      // drawBarChart(statistics, chartBox, { sort: "descending" });
    // })
    // .run({ async: true });
}
