import { Point, Segment, Circle } from "./base";
import { name } from "./utils";
export function segments(elContainer) {
  elContainer.scrollIntoView({ block: "center" });

  const elcanvas = document.createElement("canvas");
  const { width, height } = elContainer.getBoundingClientRect();
  elcanvas.width = width;
  elcanvas.height = height;
  elcanvas.style.border = "1px solid gray";
  elContainer.appendChild(elcanvas);

  const ctx = elcanvas.getContext("2d");
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#D0021B";
  const seg1 = new Segment(30, 30, 200, 30);
  const seg2 = new Segment(130, 60, 330, 60);
  const seg3 = new Segment(107, 30, 107, 300);
  ctx.beginPath();
  ctx.moveTo(seg1.p1.x, seg1.p1.y);
  ctx.lineTo(seg1.p2.x, seg1.p2.y);
  ctx.moveTo(seg2.p1.x, seg2.p1.y);
  ctx.lineTo(seg2.p2.x, seg2.p2.y);
  ctx.moveTo(seg3.p1.x, seg3.p1.y);
  ctx.lineTo(seg3.p2.x, seg3.p2.y);

  ctx.stroke();
  ctx.closePath();

  console.log(seg1.isParallel(seg2), seg1.isOrthogonal(seg2));
  console.log(seg1.isOrthogonal(seg3), seg2.isOrthogonal(seg3));

  ctx.beginPath();
  const p = new Point(200, 300);
  const seg = new Segment(100, 475, 400, 325);
  drawPoint(ctx, p);

  ctx.beginPath();
  ctx.moveTo(seg.p1.x, seg.p1.y);
  ctx.lineTo(seg.p2.x, seg.p2.y);
  ctx.stroke();

  const proj = p.project(seg);
  ctx.moveTo(p.x, p.y);
  ctx.lineTo(proj.x, proj.y);
  ctx.setLineDash([3, 2]);
  ctx.stroke();
  ctx.restore();

  const refl = p.reflect(seg);
  drawPoint(ctx, refl);

  console.log(p.getDistanceP(proj), proj.getDistanceP(refl));
  console.log(p.getDistanceL(seg), p.getDistanceS(seg));

  console.log(p.ccw(seg), proj.ccw(seg), refl.ccw(seg));
}

export function segments2(elContainer) {
  elContainer.scrollIntoView({ block: "center" });

  const elcanvas = document.createElement("canvas");
  const { width, height } = elContainer.getBoundingClientRect();
  elcanvas.width = width;
  elcanvas.height = height;
  elcanvas.style.border = "1px solid gray";
  elContainer.appendChild(elcanvas);
  elContainer.style.position = "relative";

  const btnClear = document.createElement("input");
  btnClear.setAttribute(
    "style",
    "position: absolute;top: 10px;right: 10px;width: 100px;height: 40px;cursor: pointer;text-align:center"
  );
  btnClear.setAttribute("type", "button");
  btnClear.value = "清除";
  elContainer.appendChild(btnClear);

  const selectGeoType = document.createElement("select");
  selectGeoType.setAttribute(
    "style",
    "position: absolute;top: 10px;right: 130px;width: 100px;height: 40px;cursor: pointer;text-align:center"
  );
  selectGeoType.value = "Segment";
  selectGeoType.innerHTML = ["Segment", "Circle"]
    .map((t) => `<option value="${t}">${t}</option>`)
    .join("");
  elContainer.appendChild(selectGeoType);

  const ctx = elcanvas.getContext("2d");
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#D0021B";

  const { left: cl, top: ct } = elcanvas.getBoundingClientRect();
  let sx;
  let sy;
  let ex;
  let ey;
  const cache = new Map();
  elcanvas.addEventListener(
    "mousedown",
    (e) => {
      const { clientX, clientY } = e;
      sx = clientX - cl;
      sy = clientY - ct;
      ctx.moveTo(sx, sy);
    },
    false
  );
  elcanvas.addEventListener(
    "mousemove",
    (e) => {
      if (!sx && !sy) {
        return;
      }
      const { clientX, clientY } = e;
      ex = clientX - cl;
      ey = clientY - ct;
      ctx.clearRect(0, 0, width, height);
      drawCache(ctx, cache);
      drawGeo(
        ctx,
        getGeoInstance(
          selectGeoType.value,
          new Point(sx, sy),
          new Point(ex, ey)
        )
      );
    },
    false
  );
  elcanvas.addEventListener(
    "mouseup",
    (e) => {
      const { clientX, clientY } = e;
      ex = clientX - cl;
      ey = clientY - ct;
      ctx.clearRect(0, 0, width, height);
      const nameseg = name(selectGeoType.value);
      cache.set(
        nameseg,
        getGeoInstance(
          selectGeoType.value,
          new Point(sx, sy),
          new Point(ex, ey)
        )
      );
      drawCache(ctx, cache);
      sx = sy = null;

      const lidx = nameseg.match(/(\d+)$/)[1];
      if (lidx % 2 === 1 && selectGeoType.value === "Segment") {
        const geox0 = cache.get(`${selectGeoType.value}${lidx - 1}`);
        const geox1 = cache.get(nameseg);
        console.log(
          `线段p${lidx - 1},p${lidx}${
            geox0.intersect(geox1) ? "相交" : "不相交"
          }`
        );
        drawPoint(ctx, geox0.getCrossPoint(geox1));
      }
      if (
        lidx % 2 === 1 &&
        selectGeoType.value === "Circle" &&
        cache.get(`Segment${lidx - 1}`) instanceof Segment
      ) {
        const geox0 = cache.get(`Segment${lidx - 1}`);
        const geox1 = cache.get(nameseg);
        console.log(
          `线段${lidx - 1},圆${lidx}${
            geox1.getCrossPointsL(geox0) ? "相交" : "不相交"
          }`
        );
        drawPoint(ctx, geox1.getCrossPointsL(geox0)[0]);
        drawPoint(ctx, geox1.getCrossPointsL(geox0)[1]);
      }
      if (
        lidx % 2 === 1 &&
        selectGeoType.value === "Circle" &&
        cache.get(`Circle${lidx - 1}`) instanceof Circle
      ) {
        const geox0 = cache.get(`Circle${lidx - 1}`);
        const geox1 = cache.get(nameseg);
        console.log(
          `圆${lidx - 1},圆${lidx}${
            geox1.getCrossPointsC(geox0) ? "相交" : "不相交"
          }`
        );
        drawPoint(ctx, geox1.getCrossPointsC(geox0)[0]);
        drawPoint(ctx, geox1.getCrossPointsC(geox0)[1]);
      }
    },
    false
  );
  btnClear.addEventListener("click", () => clearCache(ctx, cache));
}

function getGeoInstance(type, sp, ep) {
  let res;
  switch (type) {
    case "Segment":
      res = new Segment(sp, ep);
      break;
    case "Circle":
      res = new Circle(sp, ep.getDistanceP(sp));
      break;
    default:
      break;
  }
  return res;
}

function drawCache(ctx, cache) {
  for (const [name, geo] of cache) {
    drawGeo(ctx, geo, name);
  }
}

function drawGeo(ctx, geo, name) {
  if (geo instanceof Segment) {
    drawSegment(ctx, geo, name);
  } else if (geo instanceof Circle) {
    drawCircle(ctx, geo, name);
  }
}

function clearCache(ctx, cache) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  cache.clear();
}

function drawSegment(ctx, geo, name) {
  ctx.beginPath();
  ctx.setLineDash([0, 0]);
  ctx.strokeStyle = "#D0021B";
  ctx.moveTo(geo.p1.x, geo.p1.y);
  ctx.lineTo(geo.p2.x, geo.p2.y);
  ctx.stroke();
  ctx.fillStyle = "#333";
  ctx.fillText(name, geo.p1.x, geo.p1.y);
  ctx.closePath();
}

function drawPoint(ctx, p) {
  if (!p) {
    return;
  }
  ctx.beginPath();
  ctx.moveTo(p.x, p.y);
  ctx.arc(p.x, p.y, 3, 0, 2 * Math.PI);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

function drawCircle(ctx, c, name) {
  ctx.beginPath();
  const { center, radius } = c;
  const { x: cx, y: cy } = center;
  // ctx.moveTo(cx, cy);
  ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = "#D0021B";
  ctx.stroke();
  ctx.fillStyle = "#333";
  ctx.fillText(name, cx, cy);
  ctx.closePath();
}
