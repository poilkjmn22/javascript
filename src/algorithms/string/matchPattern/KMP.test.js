import kmpMatch from "./kmp.js";

describe("test kmpMatch method", () => {
  test("kmp match", () => {
    expect(kmpMatch("any ananthous ananym flower", "ananym")).toEqual([14]);
    expect(kmpMatch("any ananthous ananym flower", "")).toEqual([]);
    expect(kmpMatch("", "ananym")).toEqual([]);
    expect(() => kmpMatch("any ananthous ananym flower", 9)).toThrow(
      /参数错误/
    );
  });
});
