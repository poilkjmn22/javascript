import { fnMatchPattern } from "./prob.js";

export function matchPatternExample() {
  const matchPattern = fnMatchPattern("any ananthous ananym flower");
  console.log(matchPattern("ananym"));
  console.log(matchPattern("ana"));
}
