import AVLTree from "./AVLTree";

describe("test class AVLTree", () => {
  const t = new AVLTree();
  it("a new binarySearchTree instance", () => {
    expect(t.T).toBeFalsy();

    const t2 = new AVLTree([30, 88, 12, 1, 20, 17, 25]);
    expect(t2.toArray()).toEqual([1, 12, 17, 20, 25, 30, 88]);
    // expect(t2.toArray("preorder")).toEqual([30, 12, 1, 20, 17, 25, 88]);
    // expect(t2.toArray("postorder")).toEqual([1, 17, 25, 20, 12, 88, 30]);

    const t3 = new AVLTree(
      [
        { name: "a", weight: 30 },
        { name: "b", weight: 88 },
        { name: "c", weight: 12 },
        { name: "d", weight: 1 },
        { name: "e", weight: 20 },
        { name: "f", weight: 17 },
        { name: "g", weight: 25 },
      ],
      "weight"
    );
    expect(t3.toArray()).toEqual([
      { name: "d", weight: 1 },
      { name: "c", weight: 12 },
      { name: "f", weight: 17 },
      { name: "e", weight: 20 },
      { name: "g", weight: 25 },
      { name: "a", weight: 30 },
      { name: "b", weight: 88 },
    ]);
  });

  it("method insert", () => {
    t.insert(1);
    expect(t.toArray()).toEqual([1]);
    t.insert(2);
    expect(t.toArray()).toEqual([1, 2]);
    t.insert(3);
    expect(t.toArray()).toEqual([1, 2, 3]);
    t.insert(4);
    t.insert(5);
    t.insert(6);
    expect(t.root.heightDifference()).toBeLessThan(2);
  });

  it("method find", () => {
    t.insert(20);
    expect(t.find(17)).toBeFalsy();
    t.insert(17);
    t.insert(25);
    expect(t.find(17)).toBeTruthy();
    expect(t.find(20).data).toBe(20);
    expect(t.find(0)).toBeFalsy();
  });

  // it("method delete", () => {
  // t.delete(12);
  // expect(t.toArray()).toEqual([1, 17, 20, 25, 30, 88]);
  // expect(t.toArray("preorder")).toEqual([30, 17, 1, 20, 25, 88]);
  // t.delete(30);
  // expect(t.toArray()).toEqual([1, 17, 20, 25, 88]);
  // expect(t.toArray("preorder")).toEqual([88, 17, 1, 20, 25]);
  //
  // const t4 = new AVLTree([8, 2, 3, 7, 22, 1]);
  // expect(t4.toArray()).toEqual([1, 2, 3, 7, 8, 22]);
  // expect(t4.toArray("preorder")).toEqual([8, 2, 1, 3, 7, 22]);
  // t4.delete(3);
  // t4.delete(7);
  // expect(t4.toArray()).toEqual([1, 2, 8, 22]);
  // expect(t4.toArray("preorder")).toEqual([8, 2, 1, 22]);
  // });
});
