import Stack from "./Stack";
describe("test the Stack class", () => {
  const s = new Stack(3);
  test("a new Stack instance", () => {
    expect(s.S).toEqual([]);
  });

  test("class method push", () => {
    s.push(1);
    expect(s.S).toEqual([undefined, 1]);
    s.push(2);
    expect(s.S).toEqual([undefined, 1, 2]);
  });

  test("class method pop", () => {
    expect(s.pop()).toBe(2);
    expect(s.pop()).toBe(1);
  });

  test("class method top", () => {
    const s1 = new Stack();
    expect(s1.top()).toBe(undefined);
    s1.push("x");
    expect(s1.top()).toBe("x");
    s1.push("y");
    expect(s1.top()).toBe("y");
    s1.pop();
    expect(s1.top()).toBe("x");
  });

  test("class method isEmpty", () => {
    expect(s.isEmpty()).toBe(true);
  });

  test("class method size", () => {
    expect(s.size()).toBe(0);
    s.push("a");
    expect(s.size()).toBe(1);
  });

  test("class method isFull", () => {
    s.push("b");
    s.push("c");
    expect(s.isFull()).toBe(true);
  });
});
