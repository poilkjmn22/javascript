// ref: [https://dyn4j.org/2010/04/gjk-gilbert-johnson-keerthi/]
import { Vector, Polygon } from "@/geometry/base";
import { convexHullByAndrew, polygonContainsPoint } from "@/geometry/utils";
class Simplex {
  constructor() {
    this.points = [];
  }
  add(p) {
    this.points.push(p);
  }
  getLast() {
    return this.points[this.points.length - 1];
  }
  getA() {
    return this.points[0];
  }
  getB() {
    return this.points[1];
  }
  getC() {
    return this.points[2];
  }
  remove(p) {
    this.points.splice(
      this.points.findIndex((pt) => pt === p),
      1
    );
  }
  containsOrigin(d) {
    // get the last point added to the simplex
    const a = this.getA();
    // compute AO (same thing as -A)
    const ao = a.negate();
    if (this.points.length === 3) {
      // then its the triangle case
      // get b and c
      const b = this.getB();
      const c = this.getC();
      // compute the edges
      const ab = b.subtract(a);
      const ac = c.subtract(a);
      // compute the normals
      const abPerp = Vector.tripleProduct(ac, ab, ab);
      const acPerp = Vector.tripleProduct(ab, ac, ac);
      // is the origin in R4
      if (abPerp.dot(ao) > 0) {
        // remove point c
        this.remove(c);
        // set the new direction to abPerp
        d.set(abPerp);
      } else {
        // is the origin in R3
        if (acPerp.dot(ao) > 0) {
          // remove point b
          this.remove(b);
          // set the new direction to acPerp
          d.set(acPerp);
        } else {
          // otherwise we know its in R5 so we can return true
          return true;
        }
      }
    } else {
      // then its the line segment case
      const b = this.getB();
      // compute AB
      const ab = b.subtract(a);
      // get the perp to AB in the direction of the origin
      const abPerp = Vector.tripleProduct(ab, ao, ab);
      // set the direction to abPerp
      d.set(abPerp);
    }
    return false;
  }
}

function support(A, B, d) {
  const fa = A.getFarthestPointInDirection(d);
  const fb = B.getFarthestPointInDirection(d.negate());
  return fa.subtract(fb);
}

function isCollided(A, B, cb = console.log) {
  let d = new Vector(1, 1); // choose a search direction
  // get the first Minkowski Difference point
  const simp = new Simplex();
  simp.add(support(A, B, d));
  cb(simp, d);
  // negate d for the next point
  d = d.negate();
  // start looping
  while (true) {
    // add a new point to the simplex because we haven't terminated yet
    simp.add(support(A, B, d));
    cb(simp, d);
    // make sure that the last point we added actually passed the origin
    if (simp.getLast().dot(d) < 0) {
      // if the point added last was not past the origin in the direction of d
      // then the Minkowski Sum cannot possibly contain the origin since
      // the last point added is on the edge of the Minkowski Difference
      return false;
    } else {
      // otherwise we need to determine if the origin is in
      // the current simplex
      if (simp.containsOrigin(d)) {
        // if it does then we know there is a collision
        cb(simp, d);
        return true;
      }
      cb(simp, d);
    }
  }
}

function isCollidedSlow(A, B) {
  return (
    polygonContainsPoint(
      getMinkowskiDifferenceConvexHull(A, B),
      new Vector(0, 0)
    ) > 0
  );
}

function getMinkowskiDifferenceConvexHull(A, B) {
  // 假设图形A,B都为凸多边形
  const points = [];
  for (const a of A.points) {
    for (const b of B.points) {
      points.push(a.subtract(b));
    }
  }
  return convexHullByAndrew(new Polygon(points));
}

export { isCollided, isCollidedSlow, getMinkowskiDifferenceConvexHull };
