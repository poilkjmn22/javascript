import { linearSearch, binarySearch, binarySearchTree } from "./search";
import { range } from "../../utils/util";
describe("test the search methods", () => {
  const arr1 = range(1);
  const arr2 = range(2);
  const arr3 = range(10);
  const arr4 = range(1000);
  test("linearSearch", () => {
    expect(linearSearch(arr1, 0)).toBe(0);
    expect(linearSearch(arr2, 0)).toBe(0);
    expect(linearSearch(arr3, 0)).toBe(0);
    expect(linearSearch(arr4, 0)).toBe(0);
  });

  test("binarySearch", () => {
    expect(binarySearch(arr1, 0)).toBe(0);
    expect(binarySearch(arr2, 0)).toBe(0);
    expect(binarySearch(arr3, 0)).toBe(0);
    expect(binarySearch(arr4, 0)).toBe(0);
  });

  test("binarySearchTree", () => {
    expect(binarySearchTree(arr1, 0).data).toBe(0);
    expect(binarySearchTree(arr2, 0).data).toBe(0);
    expect(binarySearchTree(arr3, 0).data).toBe(0);
    expect(binarySearchTree(arr4, 0).data).toBe(0);
  });
});
