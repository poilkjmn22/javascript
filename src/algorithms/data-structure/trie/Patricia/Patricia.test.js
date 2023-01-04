import Patricia from "./Patricia";

describe("test class Patricia", () => {
  let t = new Patricia();
  it("a new Patricia", () => {
    expect(t).toEqual({
      value: null,
      children: new Map(),
    });
  });

  it("insert into a Patricia", () => {
    t = Patricia.insert(t, "boy", "boy");
    expect(t).toEqual({
      value: null,
      children: new Map([
        [
          "boy",
          {
            value: "boy",
            children: new Map(),
          },
        ],
      ]),
    });
  });

  it("lookup in a Patricia", () => {
    const t2 = Patricia.build(["a", "an", "another", "bool", "boy", "zoo"]);
    expect(t2.lookup("boy")).toBe("boy");
    expect(t2.lookup("zoo")).toBe("zoo");
    expect(t2.lookup("zoox")).toBeFalsy();
  });
});
