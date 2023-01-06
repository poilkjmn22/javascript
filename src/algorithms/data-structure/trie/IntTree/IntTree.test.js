import IntTree from "./IntTree";

describe("test class IntTree", () => {
  let t = new IntTree();
  it("a new IntTree", () => {
    expect(t).toEqual({
      key: null,
      value: null,
      left: null,
      right: null,
      prefix: null,
      mask: null,
    });
  });

  it("insert IntTree", () => {
    t = IntTree.insert(null, 1, "x");
    expect(t).toEqual({
      key: 1,
      value: "x",
      left: null,
      right: null,
      prefix: null,
      mask: null,
    });

    t = IntTree.insert(t, 4, "y");
    expect(t).toEqual({
      key: null,
      value: null,
      left: {
        key: 1,
        value: "x",
        left: null,
        right: null,
        prefix: null,
        mask: null,
      },
      right: {
        key: 4,
        value: "y",
        left: null,
        right: null,
        prefix: null,
        mask: null,
      },
      prefix: 0,
      mask: 8,
    });

    t = IntTree.insert(t, 5, "z");
    expect(t).toEqual({
      key: null,
      value: null,
      left: {
        key: 1,
        value: "x",
        left: null,
        right: null,
        prefix: null,
        mask: null,
      },
      right: {
        key: null,
        value: null,
        left: {
          key: 4,
          value: "y",
          left: null,
          right: null,
          prefix: null,
          mask: null,
        },
        right: {
          key: 5,
          value: "z",
          left: null,
          right: null,
          prefix: null,
          mask: null,
        },
        prefix: 0b100,
        mask: 2,
      },
      prefix: 0,
      mask: 8,
    });
  });

  it("build IntTree from keyValuePairs", () => {
    const t2 = IntTree.build({ 1: "x", 4: "y", 5: "z" });
    expect(t2).toEqual(t);
  });

  it("lookup in IntTree ", () => {
    expect(IntTree.lookup(t, 4)).toBe("y");
    expect(IntTree.lookup(t, 9999)).toBeFalsy();
  });
});
