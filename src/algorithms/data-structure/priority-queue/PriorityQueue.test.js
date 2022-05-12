import PriorityQueue from "./PriorityQueue";
describe("test the Queue class", () => {
  test("a new PriorityQueue instance", () => {
    const que = new PriorityQueue([4, 1, 3, 2, 16, 9, 10, 14, 8, 7]);
    expect(que.heap.H).toEqual([16, 14, 10, 8, 7, 9, 3, 2, 4, 1]);
  });
  test("PriorityQueue method enqueue", () => {
    const que = new PriorityQueue([86, 14, 37, 12, 5, 32, 11, 7, 1, 2]);
    que.enqueue(25);
    expect(que.heap.H).toEqual([86, 25, 37, 12, 14, 32, 11, 7, 1, 2, 5]);
  });

  test("PriorityQueue method dequeue,isEmpty", () => {
    const que = new PriorityQueue(
      [4, 1, 3, 2, 16, 9, 10, 14, 8, 7],
      (a) => a * -1
    );
    expect(que.heap.H).toEqual([1, 2, 3, 4, 7, 9, 10, 14, 8, 16]);
    expect(que.dequeue()).toBe(1);
    expect(que.heap.H).toEqual([2, 4, 3, 8, 7, 9, 10, 14, 16]);
    expect(que.dequeue()).toBe(2);
    expect(que.dequeue()).toBe(3);
    expect(que.dequeue()).toBe(4);
    expect(que.dequeue()).toBe(7);
    expect(que.dequeue()).toBe(8);
    expect(que.dequeue()).toBe(9);
    expect(que.dequeue()).toBe(10);
    expect(que.dequeue()).toBe(14);
    expect(que.dequeue()).toBe(16);

    expect(que.isEmpty()).toBe(true);
  });
});
