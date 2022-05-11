import MaxHeap from "./MaxHeap";
export function prob_ALDS_1_9_B(arr) {
  let output = [];
  const h = new MaxHeap(arr);
  output = h.H;
  return output;
}
