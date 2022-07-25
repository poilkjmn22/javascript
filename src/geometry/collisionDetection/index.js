import { Point, Segment } from "@/geometry/base";
import {
  name,
  getGeoInstance,
  drawCache,
  clearCache,
  drawGeo,
} from "@/geometry/utils";
import {
  isCollided,
  isCollidedSlow,
  getMinkowskiDifferenceConvexHull,
} from "./GJK";
export function GJK(elContainer) {
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
  selectGeoType.value = "Polygon";
  selectGeoType.innerHTML = ["Polygon", "Circle"]
    .map((t) => `<option value="${t}">${t}</option>`)
    .join("");
  elContainer.appendChild(selectGeoType);

  const btnDrawMD = document.createElement("input");
  btnDrawMD.setAttribute(
    "style",
    "position: absolute;top: 10px;right: 250px;width: 100px;height: 40px;cursor: pointer;text-align:center"
  );
  btnDrawMD.setAttribute("type", "button");
  btnDrawMD.value = "生成MD";
  elContainer.appendChild(btnDrawMD);

  const ctx = elcanvas.getContext("2d");
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#D0021B";

  let sx;
  let sy;
  let ex;
  let ey;
  let pointsTmp = [];
  const cache = new Map();
  let delayMouseUpCbId;
  let isEditing = false;
  let simpleList = [];
  function handleSimpleChange(simp, d) {
    simpleList.push([simp, d]);
  }
  elcanvas.addEventListener(
    "mousedown",
    (e) => {
      const { clientX, clientY } = e;
      const { left: cl, top: ct } = elcanvas.getBoundingClientRect();
      sx = clientX - cl;
      sy = clientY - ct;
      if (!isEditing) {
        // pointsTmp.push(new Point(sx, sy));
        isEditing = true;
      }
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
      const { left: cl, top: ct } = elcanvas.getBoundingClientRect();
      ex = clientX - cl;
      ey = clientY - ct;
      ctx.clearRect(0, 0, width, height);
      drawCache(ctx, cache);
      drawGeo(
        ctx,
        getGeoInstance(
          selectGeoType.value,
          selectGeoType.value === "Polygon"
            ? pointsTmp.concat([new Point(ex, ey)])
            : new Point(sx, sy),
          new Point(ex, ey)
        )
      );
    },
    false
  );
  const delayMouseUpCb = (e) => {
    const { clientX, clientY } = e;
    const { left: cl, top: ct } = elcanvas.getBoundingClientRect();
    ex = clientX - cl;
    ey = clientY - ct;
    ctx.clearRect(0, 0, width, height);
    if (selectGeoType.value !== "Polygon") {
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
      if (lidx % 2 === 1) {
        const { geo: geox0 } =
          cache.get(`Polygon${lidx - 1}`) || cache.get(`Circle${lidx - 1}`);
        const { geo: geox1 } = cache.get(nameseg);
        console.log(
          `图形${lidx - 1},图形${lidx}${
            isCollided(geox0, geox1, handleSimpleChange) ? "碰撞了" : "没有碰撞"
          }`
        );
      }
      return;
    }
    drawCache(ctx, cache);
    pointsTmp.push(new Point(ex, ey));
    drawGeo(ctx, getGeoInstance(selectGeoType.value, pointsTmp), {
      closePath: false,
    });
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
        // fillStyle: "#7B16D4",
        markPointPos: true,
      },
    });
    drawCache(ctx, cache);
    pointsTmp = [];
    sx = sy = null;
    isEditing = false;
    const lidx = nameseg.match(/(\d+)$/)[1];
    if (lidx % 2 === 1) {
      const { geo: geox0 } =
        cache.get(`Polygon${lidx - 1}`) || cache.get(`Circle${lidx - 1}`);
      const { geo: geox1 } = cache.get(nameseg);
      console.log(
        `图形${lidx - 1},图形${lidx}${
          isCollided(geox0, geox1, handleSimpleChange) ? "碰撞了" : "没有碰撞"
        }`
      );
    }
  });
  btnClear.addEventListener("click", () => clearCache(ctx, cache));

  btnDrawMD.addEventListener(
    "click",
    async () => {
      const md = getMinkowskiDifferenceConvexHull(
        (cache.get("Polygon0") || cache.get("Circle0")).geo,
        (cache.get("Polygon1") || cache.get("Circle1")).geo
      );
      // console.log(md);
      ctx.translate(700, 400);
      drawGeo(ctx, new Point(0, 0), { fillStyle: "#dc142c" });
      drawGeo(ctx, md, {
        closePath: true,
        markPointPos: true,
        strokeStyle: "#80de18",
      });
      function drawSimpleD([simp, d]) {
        return new Promise((res) => {
          setTimeout(() => {
            for (const p of simp.points) {
              drawGeo(ctx, p, { fillStyle: "purple" });
            }
            drawGeo(ctx, new Segment(new Point(0, 0), d));
            // console.log(simp, d);
            res();
          }, 2000);
        });
      }
      for (const [simp, d] of simpleList) {
        await drawSimpleD([simp, d]);
      }
    },
    false
  );
}
