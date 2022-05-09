import Stack from "./Stack";
export function prob_ALDS_1_3_A(input) {
  const S = new Stack();
  let leftOpt;
  let rightOpt;
  for (const v of input) {
    if (v === "-") {
      rightOpt = S.pop();
      leftOpt = S.pop();
      S.push(leftOpt - rightOpt);
    } else if (v === "+") {
      rightOpt = S.pop();
      leftOpt = S.pop();
      S.push(leftOpt + rightOpt);
    } else if (v === "*") {
      rightOpt = S.pop();
      leftOpt = S.pop();
      S.push(leftOpt * rightOpt);
    } else {
      S.push(v);
    }
  }
  return S.pop();
}
