import { replaceStrAt, isArray, keyBy, omit, getKey } from "./util.js";
describe("test utils exports", () => {
  it("replace string at index", () => {
    expect(replaceStrAt("abc", 1, "d")).toBe("adc");
    expect(replaceStrAt("abc", 1, "1")).toBe("a1c");
  });

  it("isArray method", () => {
    expect(isArray(undefined)).toBe(false);
    expect(isArray(["a", 1])).toBe(true);
  });

  it("keyBy method", () => {
    expect(
      keyBy(
        [
          { dir: "left", code: 97 },
          { dir: "right", code: 100 },
        ],
        "dir"
      )
    ).toEqual({
      left: { dir: "left", code: 97 },
      right: { dir: "right", code: 100 },
    });
  });

  it("omit method", () => {
    expect(omit({ a: 1, b: 2, children: [] }, "children")).toEqual({
      a: 1,
      b: 2,
    });
  });

  it("getKey", () => {
    expect(getKey(5)).toBe(5);
    expect(getKey({ x: 3, y: 4 }, "x")).toBe(3);
    expect(
      getKey({ x: 3, y: 4 }, (d) => Math.sqrt(d.x * d.x + d.y * d.y))
    ).toBe(5);
  });
});
