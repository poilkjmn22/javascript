import { lcp } from "./utils";

describe("test utils", () => {
  it("method lcp", () => {
    const [prefix, k1, k2] = lcp("boy", "bool");
    expect(prefix).toBe("bo");
    expect(k1).toBe("y");
    expect(k2).toBe("ol");

    expect(lcp("boy", "zoo")).toEqual(["", "boy", "zoo"]);
  });
});
