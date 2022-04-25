import Stack from "./Stack";
describe("test the Stack class", () => {
  const s = new Stack();
  test("a new Stack instance", () => {
    expect(s.S).toEqual([]);
  });

  test("class method push", () => {
    s.push(1);
    expect(s.S).toEqual([1]);
    s.push(2);
    expect(s.S).toEqual([1, 2]);
  });

  test("class method top", () => {
    expect(s.top()).toBe(2);
    expect(s.size()).toBe(2);
  });

  test("class method pop", () => {
    expect(s.pop()).toBe(2);
    expect(s.size()).toBe(1);
    expect(s.pop()).toBe(1);
    expect(s.isEmpty()).toBe(true);
  });

  test("class method isEmpty", () => {
    expect(s.isEmpty()).toBe(true);
  });

  test("class method size", () => {
    expect(s.size()).toBe(0);
    s.push("a");
    expect(s.size()).toBe(1);
  });
});
