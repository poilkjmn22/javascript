import RMQ from "./RMQ.js";

describe("test RMQ methods", () => {
  const rmq = new RMQ([5, 3, 7, 9, 6, 4, 1, 2]);
  test("init from an arr", () => {
    expect(rmq.dat).toEqual([1, 3, 1, 3, 7, 4, 1, 5, 3, 7, 9, 6, 4, 1, 2]);
  });

  test("rmq", () => {
    expect(rmq.query(0, 1)).toBe(5);
    expect(rmq.query(0, 7)).toBe(1);
    expect(rmq.query(0, 6)).toBe(3);
    expect(rmq.query(2, 6)).toBe(4);
  });
});
