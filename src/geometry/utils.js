import { EPS } from "./constant";
import { Point } from "./base";

function equals(a, b) {
  return Math.abs(a - b) < EPS;
}

let nameCount = 0;
function name(prefix = "") {
  return `${prefix}${nameCount++}`;
}

function polarToCartesian(d, r) {
  return new Point(d * Math.cos(r), d * Math.sin(r));
}

export { equals, name, polarToCartesian };
