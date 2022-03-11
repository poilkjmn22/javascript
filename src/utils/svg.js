const SVG_NS = 'http://www.w3.org/2000/svg';
function svg(tagName) {
  var svgEl = document.createElementNS(SVG_NS, tagName || 'svg');
  if (!tagName) {
    svgEl.setAttribute('xmlns', SVG_NS);
  }
  return svgEl;
}
function CSvg(tagName = 'svg', attrs) {
  var svgEl = document.createElementNS(SVG_NS, tagName || 'svg');
  if (tagName === 'svg') {
    svgEl.setAttribute('xmlns', SVG_NS);
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
export {
  CSvg,
  attr,
  createSvgEl,
  // createGFlower,
  setXLinkHref,
};
