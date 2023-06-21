import kmpMatch from "./matchPattern/KMP.js";

function testKmpMatch() {
  console.log(kmpMatch("any ananthous ananym flower", "ananym"));
  console.log(kmpMatch("any ananthous ananym flower", ""));
  console.log(kmpMatch("any ananthous ananym flower", 0));
}

export { testKmpMatch };
