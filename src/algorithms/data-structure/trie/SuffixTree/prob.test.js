import { lookupPattern, lrs, lcs } from "./prob";

describe("some SuffixTree probs", () => {
  it("子串出现的次数", () => {
    expect(lookupPattern("abcdabc", "abc")).toBe(2);
    expect(lookupPattern("abada", "a")).toBe(3);
    expect(lookupPattern("cacao", "ca")).toBe(2);
    expect(lookupPattern("bananas", "na")).toBe(2);
  });

  it("查找最长重复子串", () => {
    expect(lrs("mississippi")).toEqual(["issi"]);
  });

  it("查找最长公共子串", () => {
    expect(lcs("abcdfersfghi", "xbvaqurpsferii")).toEqual(["fer"]);
  });
});
