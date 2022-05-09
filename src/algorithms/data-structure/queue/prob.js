import Queue from "./Queue";
export function prob_ALDS_1_3_B(q, tasks) {
  const output = [];
  const Q = new Queue();
  for (const v of tasks) {
    Q.enqueue(v);
  }
  let past = 0;
  while (!Q.isEmpty()) {
    const [name, time] = Q.dequeue();
    if (time > q) {
      Q.enqueue([name, time - q]);
    } else {
      output.push([name, past + time]);
    }
    past += Math.min(q, time);
  }

  return output;
}
