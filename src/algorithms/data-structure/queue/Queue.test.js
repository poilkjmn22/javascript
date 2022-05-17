import Queue from "./Queue";
describe("test the Queue class", () => {
  const q = new Queue([], 3);
  test("a new Queue instance", () => {
    expect(q.Q).toEqual([]);

    const q2 = new Queue([1, 2, 3]);
    expect(q2.Q).toEqual([1, 2, 3]);

    const q3 = new Queue();
    expect(q3.Q).toEqual([]);
  });

  test("class method enqueue", () => {
    q.enqueue("a");
    expect(q.Q).toEqual(["a"]);
    q.enqueue("b");
    expect(q.Q).toEqual(["a", "b"]);
  });

  test("class method enqueueMany", () => {
    const q3 = new Queue();
    q3.enqueueMany([1, 2, 4]);
    expect(q3.Q).toEqual([1, 2, 4]);
    q3.enqueueMany(undefined);
    expect(q3.Q).toEqual([1, 2, 4]);
    // expect(() => q3.enqueueMany(undefined)).toThrow(Error);
  });

  test("class method dequeue", () => {
    expect(q.dequeue()).toBe("a");
    expect(q.dequeue()).toBe("b");
  });

  test("class method isEmpty", () => {
    expect(q.isEmpty()).toBe(true);
  });

  test("class method isFull", () => {
    q.enqueue("a");
    q.enqueue("b");
    q.enqueue("c");
    expect(q.isFull()).toBe(true);
  });
});
