import Trie from "./Trie";

describe("test class Trie", () => {
  let t = new Trie();
  it("a new Trie", () => {
    expect(t).toEqual({
      value: null,
      children: new Map(),
    });
  });

  it("insert into a Trie", () => {
    t = Trie.insert(t, "boy", "boy");
    expect(t).toEqual({
      value: null,
      children: new Map([
        [
          "b",
          {
            value: null,
            children: new Map([
              [
                "o",
                {
                  value: null,
                  children: new Map([
                    [
                      "y",
                      {
                        value: "boy",
                        children: new Map(),
                      },
                    ],
                  ]),
                },
              ],
            ]),
          },
        ],
      ]),
    });
  });

  it("lookup in a Trie", () => {
    const t2 = Trie.build(["a", "an", "another", "bool", "boy", "zoo"]);
    expect(t2.lookup("boy")).toBe("boy");
    expect(t2.lookup("zoo")).toBe("zoo");
    expect(t2.lookup("zoox")).toBeFalsy();
  });
});
