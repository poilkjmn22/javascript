import { lcp } from "./utils";

describe("test  IntTree utils", () => {
  it("lcp", () => {
    const [prefix, mask] = lcp(12, 15);
    expect(prefix).toBe(12);
    expect(prefix).toEqual(0b1100);
    expect(mask).toBe(4);
    expect(mask).toEqual(0b100);
  });
});
