import {
  constructSuffixArray,
  constructLongestCommonPrefixArray,
} from "./index.js";

describe("test suffixArray methods", () => {
  test("construct suffixArray", () => {
    expect(constructSuffixArray("abracadabra")).toEqual([
      11, 10, 7, 0, 3, 5, 8, 1, 4, 6, 9, 2,
    ]);
  });

  test("construct longest common prefix array", () => {
    const sa = constructSuffixArray("abracadabra");
    expect(constructLongestCommonPrefixArray("abracadabra", sa)).toEqual([
      0, 1, 4, 1, 1, 0, 3, 0, 0, 0, 2,
    ]);
  });
});
