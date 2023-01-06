import IntTrie from "./IntTrie";

describe("test class IntTrie", () => {
  const t = new IntTrie();
  it("a new IntTrie node", () => {
    expect(t).toEqual({ left: null, right: null, value: null });
  });
  it("insert (key, value) to IntTrie", () => {
    IntTrie.insert(t, 4, "b");
    expect(t).toEqual({
      left: {
        left: {
          left: null,
          right: { left: null, right: null, value: "4:b" },
          value: null,
        },
        right: null,
        value: null,
      },
      right: null,
      value: null,
    });

    IntTrie.insert(t, 1, "a");
    expect(t).toEqual({
      left: {
        left: {
          left: null,
          right: { left: null, right: null, value: "4:b" },
          value: null,
        },
        right: null,
        value: null,
      },
      right: { left: null, right: null, value: "1:a" },
      value: null,
    });
  });

  const t2 = IntTrie.build({ 1: "a", 4: "b", 5: "c", 9: "d" });
  it("build IntTrie from keyValuePairs", () => {
    expect(t2).toEqual({
      left: {
        left: {
          left: null,
          right: { left: null, right: null, value: "4:b" },
          value: null,
        },
        right: null,
        value: null,
      },
      right: {
        left: {
          left: {
            left: null,
            right: { left: null, right: null, value: "9:d" },
            value: null,
          },
          right: { left: null, right: null, value: "5:c" },
          value: null,
        },
        right: null,
        value: "1:a",
      },
      value: null,
    });
  });

  it("lookup", () => {
    expect(IntTrie.lookup(t2, 9)).toBe("9:d");
    expect(IntTrie.lookup(t2, 8)).toBeFalsy();
    expect(IntTrie.lookup(t2, 1)).toBe("1:a");
  });
});
