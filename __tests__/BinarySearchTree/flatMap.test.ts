import BinarySearchTree from "../../src/BinarySearchTree";
import SortedCollection from "../../src/SortedCollection";

function asc(first: number, second: number): number {
  return first - second;
}

function desc(first: number, second: number): number {
  return second - first;
}

function id(x) {
  return [x];
}

function twice(x) {
  return [x, x];
}

function pair(x) {
  return [x, -x];
}

function prime(x) {
  if (x <= 1) {
    return [];
  }
  for (let i = 2; i < x - 1; i++) {
    if (x % i == 0) {
      return [];
    }
  }
  return [x];
}

test("BinarySearchTree flatMap empty twice test", function() {
  let tree = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  tree = tree.flatMap(asc, twice);
  expect(tree.toArray()).toEqual([]);
  expect(tree.size()).toBe(0);
  expect(tree.isEmpty()).toBe(true);
});

test("BinarySearchTree flatMap 0 twice test", function() {
  let tree = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  tree = tree.add(0);
  tree = tree.flatMap(asc, twice);
  expect(tree.toArray()).toEqual([0, 0]);
  expect(tree.size()).toBe(2);
  expect(tree.isEmpty()).toBe(false);
});

test("BinarySearchTree flatMap 0 id test", function() {
  let tree = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  tree = tree.add(0);
  tree = tree.flatMap(asc, id);
  expect(tree.toArray()).toEqual([0]);
  expect(tree.size()).toBe(1);
  expect(tree.isEmpty()).toBe(false);
});

test("BinarySearchTree flatMap 1, 2, 0 twice test", function() {
  let tree = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  tree = tree.union([1, 2, 0]);
  tree = tree.flatMap(asc, twice);
  expect(tree.toArray()).toEqual([0, 0, 1, 1, 2, 2]);
  expect(tree.size()).toBe(6);
  expect(tree.isEmpty()).toBe(false);
});

test("BinarySearchTree flatMap 1, 2, 0 id test", function() {
  let tree = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  tree = tree.union([1, 2, 0]);
  tree = tree.flatMap(asc, id);
  expect(tree.toArray()).toEqual([0, 1, 2]);
  expect(tree.size()).toBe(3);
  expect(tree.isEmpty()).toBe(false);
});

test("BinarySearchTree flatMap 1, 2, 0 itself test", function() {
  let tree = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  tree = tree.union([1, 2, 0]);
  tree = tree.flatMap(asc, x => tree);
  expect(tree.toArray()).toEqual([0, 0, 0, 1, 1, 1, 2, 2, 2]);
  expect(tree.size()).toBe(9);
  expect(tree.isEmpty()).toBe(false);
});

test("BinarySearchTree flatMap 1, 2, 0 pair test", function() {
  let tree = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  tree = tree.union([1, 2, 0]);
  tree = tree.flatMap(asc, pair);
  expect(tree.toArray()).toEqual([-2, -1, -0, 0, 1, 2]);
  expect(tree.size()).toBe(6);
  expect(tree.isEmpty()).toBe(false);
});

test("BinarySearchTree flatMap 11, 7, -1, 4, 5, 6, 8, 2, 0, 1, 10, 9, 3 prime test", function() {
  let tree = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  tree = tree.union([11, 7, -1, 4, 5, 6, 8, 2, 0, 1, 10, 9, 3]);
  tree = tree.flatMap(asc, prime);
  expect(tree.toArray()).toEqual([2, 3, 5, 7, 11]);
  expect(tree.size()).toBe(5);
  expect(tree.isEmpty()).toBe(false);
});