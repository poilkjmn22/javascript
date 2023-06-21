import React from "react";
import Tag from "../tag.jsx";
import axios from "axios";
import "./config-notecate.css";
import NotecateLoader from "root/src/NotecateLoader.js";
import { toTree } from "@/utils/array-to-tree.js";
import DialogNotecate from "@/components/dialog-notecate.jsx";
import * as d3 from "d3";

class ConfigNotecate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notecateList: [],
      currentNotecate: {},
      isShowDialogNotecate: false,
    };

    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.refreshNotecateList = this.getApiNotecateList.bind(this);
  }
  render() {
    return (
      <div className={this.props.name} ref="elConfigNotecate">
        <div ref="notecateTreeBox" className="notecate-tree"></div>
        <DialogNotecate
          refreshNotecateList={this.refreshNotecateList}
          handleCloseDialog={this.handleCloseDialog}
          notecate={this.state.currentNotecate}
          isShow={this.state.isShowDialogNotecate}
        />
        <div className="modules" ref="elModules"></div>
      </div>
    );
  }
  getApiNotecateList() {
    // d3.json('data-source/flare-2.json')
    //   .then(res => this.drawNotecateTree(res))
    this.clearDrawn();
    axios
      .get("/api/note-cate/list")
      .then((res) => {
        this.setState({
          notecateList: res.data,
        });
        this.drawNotecateTree({ name: "root", children: toTree(res.data) });
      })
      .catch(console.error);
  }
  adjustElModulesAspect() {
    const aspectRatio = window.innerWidth / window.innerHeight;
    this.refs.elModules.style.setProperty("aspect-ratio", aspectRatio);
  }
  componentDidMount() {
    this.getApiNotecateList();
    this.adjustElModulesAspect();
  }
  clearDrawn() {
    d3.select("#svg-notecate-tree").remove();
  }
  handleClickNode(e, node) {
    e.stopPropagation();
    this.setState({
      currentNotecate: node.data,
      isShowDialogNotecate: true,
    });
    NotecateLoader.load(node.data.name, this);
  }
  drawNotecateTree(data) {
    const width = 954;
    const d3_tree = (data) => {
      const root = d3.hierarchy(data);
      root.dx = 10;
      root.dy = width / (root.height + 1);
      return d3.tree().nodeSize([root.dx, root.dy])(root);
    };
    const root = d3_tree(data);
    let x0 = Infinity;
    let x1 = -x0;
    root.each((d) => {
      if (d.x > x1) x1 = d.x;
      if (d.x < x0) x0 = d.x;
    });

    const svg = d3
      .create("svg")
      .attr("id", "svg-notecate-tree")
      .attr("viewBox", [0, 0, width, x1 - x0 + root.dx * 2]);
    this.refs.notecateTreeBox.appendChild(svg.node());

    const g = svg
      .append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("transform", `translate(${root.dy / 3},${root.dx - x0})`);

    const link = g
      .append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(root.links())
      .join("path")
      .attr(
        "d",
        d3
          .linkHorizontal()
          .x((d) => d.y)
          .y((d) => d.x)
      );

    const node = g
      .append("g")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
      .selectAll("g")
      .data(root.descendants())
      .join("g")
      .attr("transform", (d) => `translate(${d.y},${d.x})`);

    node
      .append("circle")
      .attr("fill", (d) => (d.children ? "#555" : "#999"))
      .attr("r", 4.5)
      .attr("cursor", "pointer")
      .on("click", (e, node) => {
        this.handleClickNode(e, node);
      });

    node
      .append("text")
      .attr("dy", "0.31em")
      .attr("x", (d) => (d.children ? -6 : 6))
      .attr("text-anchor", (d) => (d.children ? "end" : "start"))
      .text((d) => d.data.name)
      .clone(true)
      .lower()
      .attr("stroke", "white");
  }
  handleCloseDialog() {
    this.setState({
      isShowDialogNotecate: false,
    });
  }
}
ConfigNotecate.defaultProps = {
  name: "config-notecate",
};

export default ConfigNotecate;
