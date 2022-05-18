import MaxHeap from "./MaxHeap";
describe("test the Queue class", () => {
  const h = new MaxHeap([4, 1, 3, 2, 16, 9, 10, 14, 8, 7]);
  test("a new MaxHeap instance", () => {
    expect(h.H).toEqual([16, 14, 10, 8, 7, 9, 3, 2, 4, 1]);

    const h2 = new MaxHeap([4, 1, 3, 2, 16, 9, 10, 14, 8, 7], (a) => a * -1);
    expect(h2.H).toEqual([1, 2, 3, 4, 7, 9, 10, 14, 8, 16]);

    const h3 = new MaxHeap(
      [
        { name: "a", weight: 4 },
        { name: "b", weight: 1 },
        { name: "c", weight: 3 },
        { name: "d", weight: 2 },
        { name: "e", weight: 16 },
        { name: "f", weight: 9 },
        { name: "g", weight: 10 },
        { name: "h", weight: 14 },
        { name: "i", weight: 8 },
        { name: "j", weight: 7 },
      ],
      "weight"
    );
    expect(h3.H).toEqual([
      { name: "e", weight: 16 },
      { name: "h", weight: 14 },
      { name: "g", weight: 10 },
      { name: "i", weight: 8 },
      { name: "j", weight: 7 },
      { name: "f", weight: 9 },
      { name: "c", weight: 3 },
      { name: "d", weight: 2 },
      { name: "a", weight: 4 },
      { name: "b", weight: 1 },
    ]);

    const h4 = new MaxHeap(
      [
        { name: "a", weight: 4 },
        { name: "b", weight: 1 },
        { name: "c", weight: 3 },
        { name: "d", weight: 2 },
        { name: "e", weight: 16 },
        { name: "f", weight: 9 },
        { name: "g", weight: 10 },
        { name: "h", weight: 14 },
        { name: "i", weight: 8 },
        { name: "j", weight: 7 },
      ],
      (a) => a.weight * -1
    );
    expect(h4.H).toEqual([
      { name: "b", weight: 1 },
      { name: "d", weight: 2 },
      { name: "c", weight: 3 },
      { name: "a", weight: 4 },
      { name: "j", weight: 7 },
      { name: "f", weight: 9 },
      { name: "g", weight: 10 },
      { name: "h", weight: 14 },
      { name: "i", weight: 8 },
      { name: "e", weight: 16 },
    ]);
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
