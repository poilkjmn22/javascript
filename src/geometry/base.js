import { equals, polarToCartesian } from "./utils";
import {
  EPS,
  COUNTER_CLOCKWISE,
  CLOCKWISE,
  ON_LINE_BACK,
  ON_LINE_FRONT,
  ON_SEGMENT,
} from "./constant";
class Segment {
  constructor(x1, y1, x2, y2) {
    if (x1 instanceof Vector && y1 instanceof Vector) {
      this.p1 = x1;
      this.p2 = y1;
    } else {
      this.p1 = new Vector(x1, y1);
      this.p2 = new Vector(x2, y2);
    }
  }
  // 线段正交
  isOrthogonal(seg2) {
    const v1 = new Vector(this);
    const v2 = new Vector(seg2);
    return equals(v1.dot(v2), 0);
  }
  // 线段平行
  isParallel(seg2) {
    const v1 = new Vector(this);
    const v2 = new Vector(seg2);
    return equals(v1.cross(v2), 0);
  }
  // 两条线段是否相交
  intersect(seg2) {
    return (
      this.p1.ccw(seg2) * this.p2.ccw(seg2) <= 0 &&
      seg2.p1.ccw(this) * seg2.p2.ccw(this) <= 0
    );
  }
  // 两条线段交点
  getCrossPoint(seg2) {
    if (!this.intersect(seg2)) {
      return null;
    }
    const d1 = this.p1.getDistanceL(seg2);
    const d2 = this.p2.getDistanceL(seg2);
    const t = d1 / (d1 + d2);
    const vp1p2 = new Vector(this);
    return vp1p2.multiple(t).add(this.p1);
  }
}

class Line {
  constructor(seg) {
    this.seg = seg;
  }
}

class Circle {
  constructor(center, radius) {
    this.center = center;
    this.radius = radius;
  }
  // 圆和直线的交点
  getCrossPointsL(l) {
    if (this.center.getDistanceL(l) > this.radius) {
      return null;
    }
    const seg = l.seg || l;
    const vp1p2 = new Vector(seg);
    const pr = this.center.project(seg);
    const vcpr = pr.subtract(this.center);
    const e = vp1p2.divide(vp1p2.abs());
    const base = Math.sqrt(this.radius * this.radius - vcpr.norm());
    return [pr.add(e.multiple(base)), pr.subtract(e.multiple(base))];
  }
  getCrossPointsC(c2) {
    const vc1c2 = c2.center.subtract(this.center);
    const dc1c2 = vc1c2.abs();
    if (dc1c2 > this.radius + c2.radius) {
      return null;
    }
    const theta = Math.acos(
      (this.radius * this.radius + dc1c2 * dc1c2 - c2.radius * c2.radius) /
        (2 * dc1c2 * this.radius)
    ); // 余弦定理
    const t = vc1c2.arg();
    return [
      this.center.add(polarToCartesian(this.radius, t + theta)),
      this.center.add(polarToCartesian(this.radius, t - theta)),
    ];
  }
}

class Polygon {
  constructor(points) {
    this.points = points;
  }
}

class Vector {
  constructor(x, y) {
    if (x instanceof Segment) {
      const { p1, p2 } = x;
      this.x = p2.x - p1.x;
      this.y = p2.y - p1.y;
    } else {
      this.x = x;
      this.y = y;
    }
  }
  isEqual(p2) {
    return equals(this.x, p2.x) && equals(this.y, p2.y);
  }
  add(v2) {
    return new Vector(this.x + v2.x, this.y + v2.y);
  }
  subtract(v2) {
    return new Vector(this.x - v2.x, this.y - v2.y);
  }
  multiple(a) {
    return new Vector(this.x * a, this.y * a);
  }
  divide(a) {
    return new Vector(this.x / a, this.y / a);
  }
  // 向量的范数
  norm() {
    return this.x * this.x + this.y * this.y;
  }
  // 向量的大小
  abs() {
    return Math.sqrt(this.norm());
  }
  // 两个向量的内积: abs(a) * abs(b) * cos(角ab)
  dot(v2) {
    return this.x * v2.x + this.y * v2.y;
  }
  // 两个向量的外积: abs(a) * abs(b) * sin(角ab)
  cross(v2) {
    return this.x * v2.y - this.y * v2.x;
  }
  project(seg) {
    const vp1p2 = new Vector(seg);
    const vp1p = new Vector(new Segment(seg.p1.x, seg.p1.y, this.x, this.y));
    const r = vp1p2.dot(vp1p) / vp1p2.norm();
    return seg.p1.add(vp1p2.multiple(r));
  }
  reflect(seg) {
    const v = this.project(seg).subtract(this).multiple(2);
    return this.add(v);
  }
  getDistanceP(p2) {
    return p2.subtract(this).abs();
  }
  getDistanceL(l) {
    if (!(l instanceof Line || l instanceof Segment)) {
      throw new Error("参数错误：要求直线或者线段");
    }
    const seg = l.seg || l;
    const vp1p2 = new Vector(seg);
    const vp1p = this.subtract(seg.p1);
    return Math.abs(vp1p2.cross(vp1p)) / vp1p2.abs();
  }
  getDistanceS(seg) {
    if (!(seg instanceof Segment)) {
      throw new Error("参数错误：要求线段");
    }
    const vp1p2 = new Vector(seg);
    const vp1p = this.subtract(seg.p1);
    const vp2p1 = vp1p2.multiple(-1);
    const vp2p = this.subtract(seg.p2);

    if (vp1p2.dot(vp1p) < 0) {
      return vp1p.abs();
    } else if (vp2p1.dot(vp2p) < 0) {
      return vp2p.abs();
    } else {
      return this.getDistanceL(seg);
    }
  }
  // 点在线段p1,p2的哪个方向
  ccw(p1, p2) {
    if (p1 instanceof Segment) {
      const seg = p1;
      p1 = seg.p1;
      p2 = seg.p2;
    }
    const vp1p2 = p2.subtract(p1);
    const vp1p = this.subtract(p1);
    if (vp1p.cross(vp1p2) > EPS) {
      return COUNTER_CLOCKWISE;
    }
    if (vp1p.cross(vp1p2) < -EPS) {
      return CLOCKWISE;
    }
    if (vp1p.dot(vp1p2) < -EPS) {
      return ON_LINE_BACK;
    }
    if (vp1p.norm() > vp1p2.norm()) {
      return ON_LINE_FRONT;
    }
    return ON_SEGMENT;
  }
  arg() {
    return Math.atan2(this.y, this.x);
  }
}

class Point extends Vector {
  constructor(x, y) {
    super(x, y);
  }
}

export { Segment, Line, Circle, Polygon, Vector, Point };
