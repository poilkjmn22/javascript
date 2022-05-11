import MaxHeap from "./MaxHeap";
describe("test the Queue class", () => {
  const h = new MaxHeap([4, 1, 3, 2, 16, 9, 10, 14, 8, 7]);
  test("a new MaxHeap instance", () => {
    expect(h.H).toEqual([16, 14, 10, 8, 7, 9, 3, 2, 4, 1]);
  });
  test("MaxHeap method buildHeap", () => {
    h.buildHeap([5, 86, 37, 12, 25, 32, 11, 7, 1, 2, 4, 19]);
    expect(h.H).toEqual([86, 25, 37, 12, 5, 32, 11, 7, 1, 2, 4, 19]);
  });

  test("MaxHeap method insert", () => {
    h.buildHeap([86, 14, 37, 12, 5, 32, 11, 7, 1, 2]);
    h.insert(25);
    expect(h.H).toEqual([86, 25, 37, 12, 14, 32, 11, 7, 1, 2, 5]);
  });

  test("MaxHeap method extract", () => {
    h.buildHeap([86, 37, 32, 12, 14, 25, 11, 7, 1, 2, 3]);
    expect(h.extract()).toEqual(86);
    expect(h.H).toEqual([37, 14, 32, 12, 3, 25, 11, 7, 1, 2]);
  });
});
