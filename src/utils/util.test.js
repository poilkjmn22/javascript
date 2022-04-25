import { replaceStrAt } from "./util.js";
test("replace string at index", () => {
  expect(replaceStrAt("abc", 1, "d")).toBe("adc");
  expect(replaceStrAt("abc", 1, "1")).toBe("a1c");
});
