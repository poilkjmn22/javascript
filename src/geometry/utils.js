import { EPS, CONTAINS, CLOCKWISE } from "./constant";
import { Vector, Segment, Circle, Polygon } from "./base";
import Stack from "@/algorithms/data-structure/stack/Stack";

function equals(a, b) {
  return Math.abs(a - b) < EPS;
}

function swapVector(a, b) {
  let tmp = new Vector(a);
  a.set(b);
  b.set(tmp);
}

let nameCount = 0;
function name(prefix = "") {
  return `${prefix}${nameCount++}`;
}

function polarToCartesian(d, r) {
  return new Vector(d * Math.cos(r), d * Math.sin(r));
}
function getGeoInstance(type, sp, ep) {
  let res;
  switch (type) {
    case "Point":
      res = ep;
      break;
    case "Segment":
      res = new Segment(sp, ep);
      break;
    case "Circle":
      res = new Circle(sp, ep.getDistanceP(sp));
      break;
    case "Polygon":
      res = new Polygon(sp);
      break;
    default:
      break;
  }
  return res;
}

function drawCache(ctx, cache) {
  for (const [name, { geo, drawOptions }] of cache) {
    drawGeo(ctx, geo, Object.assign({ name }, drawOptions));
  }
}

function clearCache(ctx, cache) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  cache.clear();
}

function drawGeo(ctx, geo, options) {
  if (geo instanceof Segment) {
    drawSegment(ctx, geo, options);
  } else if (geo instanceof Circle) {
    drawCircle(ctx, geo, options);
  } else if (geo instanceof Polygon) {
    drawPolygon(ctx, geo, options);
  } else if (geo instanceof Vector) {
    drawPoint(ctx, geo, options);
  }
}

function drawSegment(ctx, geo, options) {
  ctx.beginPath();
  ctx.setLineDash([0, 0]);
  ctx.strokeStyle = "#D0021B";
  ctx.moveTo(geo.p1.x, geo.p1.y);
  ctx.lineTo(geo.p2.x, geo.p2.y);
  ctx.stroke();
  ctx.fillStyle = "#333";
  ctx.fillText((options && options.name) || "", geo.p1.x, geo.p1.y);
  ctx.closePath();
}

function drawPoint(ctx, p, options = {}) {
  if (!p) {
    return;
  }
  ctx.beginPath();
  ctx.moveTo(p.x, p.y);
  ctx.arc(p.x, p.y, 3, 0, 2 * Math.PI);
  ctx.fillStyle = options.fillStyle || "black";
  ctx.fill();
  ctx.closePath();
}

function drawCircle(ctx, c, options = {}) {
  ctx.beginPath();
  const { center, radius } = c;
  const { x: cx, y: cy } = center;
  // ctx.moveTo(cx, cy);
  ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = options.strokeStyle || "#D0021B";
  ctx.stroke();
  if (options.fillStyle) {
    ctx.fillStyle = options.fillStyle || "#333";
    ctx.fill();
  }
  ctx.fillText((options && options.name) || "", cx, cy);
  ctx.closePath();
}

function drawPolygon(ctx, poly, options = {}) {
  ctx.beginPath();
  for (let i = 0; i < poly.points.length; i++) {
    const p = poly.points[i];
    if (i === 0) {
      ctx.moveTo(p.x, p.y);
    } else {
      ctx.lineTo(p.x, p.y);
    }
    if (options.markPointPos) {
      ctx.fillStyle = "#333";
      ctx.fillText(`(${p.x}, ${Math.round(p.y)})`, p.x, p.y);
    }
  }
  if (options.closePath) {
    ctx.lineTo(poly.points[0].x, poly.points[0].y);
  }
  if (options.fillStyle) {
    ctx.fillStyle = options.fillStyle;
    ctx.fill();
  }
  ctx.strokeStyle = options.strokeStyle || "#D0021B";
  ctx.stroke();
}

function polygonContainsPoint(poly, p) {
  const points = poly.points;
  let x = 0; // p点引一条沿x轴的射线，与poly的交点个数
  for (let i = 0; i < points.length; i++) {
    let vpp1 = points[i].subtract(p);
    let vpp2 = points[(i + 1) % points.length].subtract(p);
    if (Math.abs(vpp1.cross(vpp2)) < EPS && vpp1.dot(vpp2) < EPS) {
      // 点乘包括了p点刚好在边上的端点的情况，
      return CONTAINS.ON;
    }
    if (vpp1.y > vpp2.y) {
      swapVector(vpp1, vpp2);
    }
    if (vpp1.y < EPS && vpp2.y > EPS && vpp1.cross(vpp2) > EPS) {
      x += 1;
    }
  }
  return x % 2 === 0 ? CONTAINS.OUT : CONTAINS.IN;
}

function convexHullByAndrew(poly) {
  const points = [...poly.points];
  const pointsSortByXY = points
    .sort((a, b) => a.y - b.y)
    .sort((a, b) => a.x - b.x);
  const u = new Stack();
  const l = new Stack();

  if (pointsSortByXY.length <= 3) {
    return new Polygon(pointsSortByXY);
  }

  // 凸包的上半部分
  u.push(pointsSortByXY[0]);
  u.push(pointsSortByXY[1]);
  for (let i = 2; i < pointsSortByXY.length; i++) {
    const currPoint = pointsSortByXY[i];
    const currLastU = u.size() - 1;
    // 新加入的点如果不在倒数二一点连线的顺时针方向，就不是凸多边形，删除倒数一的点
    for (
      let j = currLastU;
      j >= 1 && currPoint.ccw(u.get(j - 1), u.get(j)) !== CLOCKWISE;
      j--
    ) {
      u.pop();
    }
    u.push(currPoint);
  }

  // 凸包的下半部分
  pointsSortByXY.reverse();
  l.push(pointsSortByXY[0]);
  l.push(pointsSortByXY[1]);
  for (let i = 2; i < pointsSortByXY.length; i++) {
    const currPoint = pointsSortByXY[i];
    const currLastU = l.size() - 1;
    // 新加入的点如果不在倒数二一点连线的顺时针方向，就不是凸多边形，删除倒数一的点
    for (
      let j = currLastU;
      j >= 1 && currPoint.ccw(l.get(j - 1), l.get(j)) !== CLOCKWISE;
      j--
    ) {
      l.pop();
    }
    l.push(currPoint);
  }

  const resPoints = [];
  for (let i = 0; i < u.size(); i++) {
    resPoints.push(u.get(i));
  }
  for (let i = 1; i < l.size() - 1; i++) {
    resPoints.push(l.get(i));
  }
  return new Polygon(resPoints);
}

export {
  equals,
  name,
  polarToCartesian,
  getGeoInstance,
  drawCache,
  clearCache,
  drawGeo,
  polygonContainsPoint,
  swapVector,
  convexHullByAndrew,
};
