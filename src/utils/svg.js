const SVG_NS = "http://www.w3.org/2000/svg";
function svg(tagName) {
  var svgEl = document.createElementNS(SVG_NS, tagName || "svg");
  if (!tagName) {
    svgEl.setAttribute("xmlns", SVG_NS);
  }
  return svgEl;
}
function CSvg(tagName = "svg", attrs) {
  var svgEl = document.createElementNS(SVG_NS, tagName || "svg");
  if (tagName === "svg") {
    svgEl.setAttribute("xmlns", SVG_NS);
  }
  attr(svgEl, attrs);
  return svgEl;
}

function attr(el, values) {
  for (let k in values) {
    el.setAttribute(k, values[k]);
  }
}

function createSvgEl(tagName, attrs) {
  var svgEl = svg(tagName);
  attr(svgEl, attrs);
  return svgEl;
}

// function createGFlower(){
//   var gFlower = createSvgEl('g', {
//     id: 'flower'
//   })

//   var imageFlower = createSvgEl('image', {
//     'xlink:href': '/assets/svgs/flower.svg'
//   })
//   imageFlower.href.baseVal = '/assets/svgs/flower.svg'
//   gFlower.appendChild(imageFlower)
//   return gFlower
// }
function setXLinkHref(el, url) {
  el.href.baseVal = url;
}

function makeArrowDef(svg, arrowId = "arrow", color = "red") {
  const defs = svg.append("defs");
  const arrowMarker = defs
    .append("marker")
    .attr("id", arrowId)
    .attr("markerUnits", "strokeWidth")
    .attr("markerWidth", 8)
    .attr("markerHeight", 8)
    .attr("viewBox", "0 0 12 12")
    .attr("refX", 13)
    .attr("refY", 6)
    .attr("orient", "auto");

  const arrowPath = "M2,2 L10,6 L2,10 L6,6 L2,2";
  arrowMarker.append("path").attr("d", arrowPath).attr("fill", color);
}
export {
  CSvg,
  attr,
  createSvgEl,
  // createGFlower,
  setXLinkHref,
  makeArrowDef,
};
