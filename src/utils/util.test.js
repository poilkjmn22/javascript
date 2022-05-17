import { replaceStrAt, isArray, keyBy, omit } from "./util.js";
test("replace string at index", () => {
  expect(replaceStrAt("abc", 1, "d")).toBe("adc");
  expect(replaceStrAt("abc", 1, "1")).toBe("a1c");
});

test("isArray method", () => {
  expect(isArray(undefined)).toBe(false);
  expect(isArray(["a", 1])).toBe(true);
});

test("keyBy method", () => {
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

test("omit method", () => {
  expect(omit({ a: 1, b: 2, children: [] }, "children")).toEqual({
    a: 1,
    b: 2,
  });
});
