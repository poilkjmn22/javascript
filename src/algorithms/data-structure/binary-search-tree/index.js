import { prob_ALDS_1_8_A } from "./prob";
import AVLTree from "./AVLTree";
import BinarySearchTree from "./BinarySearchTree";
import { range } from "@/utils/util";
import { shuffle } from "lodash";
import { angleToRad } from "@/geometry/utils";
import * as d3 from "d3";

export function example_prob_ALDS_1_8_A() {
  prob_ALDS_1_8_A([30, 88, 12, 1, 20, 17, 25]);
  prob_ALDS_1_8_A(
    [
      { name: "a", weight: 30 },
      { name: "b", weight: 88 },
      { name: "c", weight: 12 },
      { name: "d", weight: 1 },
      { name: "e", weight: 20 },
      { name: "f", weight: 17 },
      { name: "g", weight: 25 },
    ],
    "weight"
  );
}

export function example_AVLTree() {
  // console.log(elContainer);
  const avl = new AVLTree(range(6));
  console.log(avl);
  const t3 = new AVLTree(
    [
      { name: "a", weight: 30 },
      { name: "b", weight: 88 },
      { name: "c", weight: 12 },
      { name: "d", weight: 1 },
      { name: "e", weight: 20 },
      { name: "f", weight: 17 },
      { name: "g", weight: 25 },
    ],
    "weight"
  );
  console.log(t3);
}

export function drawBSTByD3(elContainer) {
  const { offsetWidth, offsetHeight } = elContainer;
  const bst = new BinarySearchTree(shuffle(range(0, 20)));
  const svg = d3
    .create("svg")
    .attr("id", "svg-bst-tree")
    .attr("viewBox", [0, 0, offsetWidth, offsetHeight]);
  elContainer.appendChild(svg.node());

  const g = svg
    .append("g")
    .attr("class", "tree-container")
    .attr("font-family", "sans-serif")
    .attr("font-size", 20);

  const r = 20;
  const x0 = r;
  const y0 = r;
  const levelHeight = 120;
  const angle = 40;
  const mainColor = "#1A6EEA";
  const drawLine = (n1, n2, g) => {
    const line = d3.line()([
      [n1.x, n1.y],
      [n2.x, n2.y],
    ]);
    g.append("path")
      .attr("class", "join-line")
      .attr("d", line)
      .attr("fill", mainColor)
      .attr("stroke", mainColor)
      .attr("stroke-width", 2);
  };
  const drawNode = (n) => {
    if (!n) {
      return;
    }
    if (!n.parent) {
      n.x = x0;
      n.y = y0;
      n.level = 0;
    } else {
      n.level = n.parent.level + 1;
    }
    const gn = g
      .append("g")
      .attr("class", "node-container")
      .datum(n)
      .attr("transform", `translate(${n.x}, ${n.y})`);
    gn.append("circle")
      .attr("fill", n.left || n.right ? mainColor : "#999")
      .attr("r", r)
      .attr("cursor", "pointer");
    gn.append("text")
      .attr("style", "font-size: 18px;fill: #fff;")
      .attr("text-anchor", "end")
      .text(n.data)
      .attr("dx", "0.25em")
      .attr("dy", "0.3em")
      .attr("stroke", "white");
    if (n.left) {
      n.left.x = n.x - levelHeight * Math.tan(angleToRad(angle - n.level * 5));
      n.left.y = n.y + levelHeight;
      drawLine(n, n.left, g);
      drawNode(n.left);
    }
    if (n.right) {
      n.right.x = n.x + levelHeight * Math.tan(angleToRad(angle - n.level * 5));
      n.right.y = n.y + levelHeight;
      drawLine(n, n.right, g);
      drawNode(n.right);
    }
  };

  drawNode(bst.T);

  fitView();
  function fitView() {
    let minX = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    bst.inorder((n) => {
      minX = Math.min(minX, n.x);
      maxX = Math.max(maxX, n.x);
      maxY = Math.max(maxY, n.y);
    });
    svg.attr("viewBox", [
      Math.min(minX - r, 0),
      0,
      Math.max(maxX - minX + r * 2, offsetWidth),
      Math.max(maxY + r * 2, offsetHeight),
    ]);
  }
}

export function drawAVLTreeByD3(elContainer) {
  const { offsetWidth, offsetHeight } = elContainer;
  const avl = new AVLTree(shuffle(range(0, 20)));
  const svg = d3
    .create("svg")
    .attr("id", "svg-avl-tree")
    .attr("viewBox", [0, 0, offsetWidth, offsetHeight]);
  elContainer.appendChild(svg.node());

  let treeContainer;
  const r = 20;
  const x0 = r;
  const y0 = r;
  const levelHeight = 120;
  const angle = 40;
  const mainColor = "#1A6EEA";
  const drawLine = (n1, n2, g) => {
    const line = d3.line()([
      [n1.x, n1.y],
      [n2.x, n2.y],
    ]);
    g.append("path")
      .attr("class", "join-line")
      .attr("d", line)
      .attr("fill", mainColor)
      .attr("stroke", mainColor)
      .attr("stroke-width", 2);
  };
  const drawNode = (n) => {
    if (!n) {
      return;
    }
    if (!n.parent) {
      n.x = x0;
      n.y = y0;
      n.level = 0;
    } else {
      n.level = n.parent.level + 1;
    }
    const gn = treeContainer
      .append("g")
      .attr("class", "node-container")
      .attr("transform", `translate(${n.x}, ${n.y})`);
    gn.append("circle")
      .attr("fill", n.left || n.right ? mainColor : "#999")
      .attr("r", r)
      .attr("cursor", "pointer");
    gn.append("text")
      .attr("style", "font-size: 18px;fill: #fff;")
      .attr("text-anchor", "end")
      .text(n.data)
      .attr("dx", "0.25em")
      .attr("dy", "0.3em")
      .attr("stroke", "white");
    if (n.left) {
      n.left.x = n.x - levelHeight * Math.tan(angleToRad(angle - n.level * 5));
      n.left.y = n.y + levelHeight;
      drawLine(n, n.left, treeContainer);
      drawNode(n.left);
    }
    if (n.right) {
      n.right.x = n.x + levelHeight * Math.tan(angleToRad(angle - n.level * 5));
      n.right.y = n.y + levelHeight;
      drawLine(n, n.right, treeContainer);
      drawNode(n.right);
    }
  };

  function drawTree(avl) {
    if (treeContainer) {
      treeContainer.remove();
    }
    treeContainer = svg
      .append("g")
      .attr("class", "tree-container")
      .attr("font-family", "sans-serif")
      .attr("font-size", 20);
    drawNode(avl.root);
    treeContainer
      .selectAll(".node-container")
      .data(avl.toArray("preorder"))
      .on("click", (e, d) => {
        avl.delete(d);
        drawTree(avl);
      });
  }

  drawTree(avl);

  fitView();
  function fitView() {
    let minX = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    avl.inorder((n) => {
      minX = Math.min(minX, n.x);
      maxX = Math.max(maxX, n.x);
      maxY = Math.max(maxY, n.y);
    });
    svg.attr("viewBox", [
      Math.min(minX - r, 0),
      0,
      Math.max(maxX - minX + r * 2, offsetWidth),
      Math.max(maxY + r * 2, offsetHeight),
    ]);
  }
}
