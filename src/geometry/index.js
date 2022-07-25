import { Point, Segment, Circle, Polygon } from "./base";
import {
  name,
  getGeoInstance,
  drawCache,
  clearCache,
  drawGeo,
  polygonContainsPoint,
  convexHullByAndrew,
} from "./utils";

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
  drawGeo(ctx, p);

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
  drawGeo(ctx, refl);

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
      cache.set(nameseg, {
        geo: getGeoInstance(
          selectGeoType.value,
          new Point(sx, sy),
          new Point(ex, ey)
        ),
      });
      drawCache(ctx, cache);
      sx = sy = null;

      const lidx = nameseg.match(/(\d+)$/)[1];
      if (lidx % 2 === 1 && selectGeoType.value === "Segment") {
        const { geo: geox0 } = cache.get(`${selectGeoType.value}${lidx - 1}`);
        const { geo: geox1 } = cache.get(nameseg);
        console.log(
          `线段p${lidx - 1},p${lidx}${
            geox0.intersect(geox1) ? "相交" : "不相交"
          }`
        );
        drawGeo(ctx, geox0.getCrossPoint(geox1));
      }
      if (
        lidx % 2 === 1 &&
        selectGeoType.value === "Circle" &&
        cache.get(`Segment${lidx - 1}`) &&
        cache.get(`Segment${lidx - 1}`).geo instanceof Segment
      ) {
        const { geo: geox0 } = cache.get(`Segment${lidx - 1}`);
        const { geo: geox1 } = cache.get(nameseg);
        console.log(
          `线段${lidx - 1},圆${lidx}${
            geox1.getCrossPointsL(geox0) ? "相交" : "不相交"
          }`
        );
        drawGeo(ctx, geox1.getCrossPointsL(geox0)[0]);
        drawGeo(ctx, geox1.getCrossPointsL(geox0)[1]);
      }
      if (
        lidx % 2 === 1 &&
        selectGeoType.value === "Circle" &&
        cache.get(`Circle${lidx - 1}`) &&
        cache.get(`Circle${lidx - 1}`).geo instanceof Circle
      ) {
        const { geo: geox0 } = cache.get(`Circle${lidx - 1}`);
        const { geo: geox1 } = cache.get(nameseg);
        console.log(
          `圆${lidx - 1},圆${lidx}${
            geox1.getCrossPointsC(geox0) ? "相交" : "不相交"
          }`
        );
        drawGeo(ctx, geox1.getCrossPointsC(geox0)[0]);
        drawGeo(ctx, geox1.getCrossPointsC(geox0)[1]);
      }
    },
    false
  );
  btnClear.addEventListener("click", () => clearCache(ctx, cache));
}

export function contains(elContainer) {
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
  selectGeoType.innerHTML = ["Polygon", "Point"]
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
  let pointsTmp = [];
  const cache = new Map();
  let delayMouseUpCbId;
  let isEditing = false;
  elcanvas.addEventListener(
    "mousedown",
    (e) => {
      const { clientX, clientY } = e;
      sx = clientX - cl;
      sy = clientY - ct;
      if (!isEditing && selectGeoType.value === "Polygon") {
        // pointsTmp.push(new Point(sx, sy));
        isEditing = true;
      }
    },
    false
  );
  elcanvas.addEventListener(
    "mousemove",
    (e) => {
      if ((!sx && !sy) || !isEditing) {
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
          pointsTmp.concat([new Point(ex, ey)])
        ),
        { closePath: false }
      );
    },
    false
  );
  const delayMouseUpCb = (e) => {
    const { clientX, clientY } = e;
    ex = clientX - cl;
    ey = clientY - ct;
    ctx.clearRect(0, 0, width, height);
    if (selectGeoType.value === "Point") {
      const nameseg = name(selectGeoType.value);
      cache.set(nameseg, {
        geo: getGeoInstance(selectGeoType.value, pointsTmp, new Point(ex, ey)),
        drawOptions: {
          fillStyle: "#7B16D4",
        },
      });
      drawCache(ctx, cache);
      const lidx = nameseg.match(/(\d+)$/)[1];
      if (lidx > 0 && cache.get(nameseg).geo instanceof Point) {
        const { geo: geox0 } = cache.get(`Polygon0`);
        const { geo: geox1 } = cache.get(nameseg);
        console.log(
          `多边形0,点${lidx}位置关系${polygonContainsPoint(geox0, geox1)}`
        );
      }
      return;
    }
    drawCache(ctx, cache);
    pointsTmp.push(new Point(ex, ey));
    drawGeo(
      ctx,
      getGeoInstance(selectGeoType.value, pointsTmp, new Point(ex, ey)),
      {
        closePath: false,
      }
    );
  };
  elcanvas.addEventListener(
    "mouseup",
    (e) => {
      clearTimeout(delayMouseUpCbId);
      delayMouseUpCbId = setTimeout(() => {
        delayMouseUpCb(e);
      }, 0);
    },
    false
  );
  elcanvas.addEventListener("dblclick", () => {
    clearTimeout(delayMouseUpCbId);
    ctx.clearRect(0, 0, width, height);
    const nameseg = name(selectGeoType.value);
    cache.set(nameseg, {
      geo: getGeoInstance(selectGeoType.value, pointsTmp),
      drawOptions: {
        closePath: true,
        markPointPos: true,
      },
    });
    drawCache(ctx, cache);
    pointsTmp = [];
    sx = sy = null;
    isEditing = false;
  });
  btnClear.addEventListener("click", () => clearCache(ctx, cache));
}

export function convexHull(elContainer) {
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

  const drawConvexHull = document.createElement("input");
  drawConvexHull.setAttribute(
    "style",
    "position: absolute;top: 10px;right: 130px;width: 100px;height: 40px;cursor: pointer;text-align:center"
  );
  drawConvexHull.setAttribute("type", "button");
  drawConvexHull.value = "生成凸包";
  elContainer.appendChild(drawConvexHull);

  const ctx = elcanvas.getContext("2d");
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#D0021B";

  const { left: cl, top: ct } = elcanvas.getBoundingClientRect();
  let ex;
  let ey;
  const cache = new Map();
  let pointsTmp = [];
  const mouseUpCb = (e) => {
    const { clientX, clientY } = e;
    ex = clientX - cl;
    ey = clientY - ct;
    ctx.clearRect(0, 0, width, height);
    const nameseg = name("Point");
    cache.set(nameseg, {
      geo: getGeoInstance("Point", null, new Point(ex, ey)),
      drawOptions: {
        fillStyle: "#7B16D4",
      },
    });
    drawCache(ctx, cache);
    pointsTmp.push(new Point(ex, ey));
    return;
  };
  elcanvas.addEventListener(
    "mouseup",
    (e) => {
      mouseUpCb(e);
    },
    false
  );
  btnClear.addEventListener("click", () => clearCache(ctx, cache));
  drawConvexHull.addEventListener(
    "click",
    () => {
      const convexHull = convexHullByAndrew(new Polygon(pointsTmp));
      // console.log(convexHull);
      drawGeo(ctx, convexHull, {
        closePath: true,
        markPointPos: true,
      });
      // pointsTmp = [];
    },
    false
  );
}
