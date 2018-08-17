"use strict";

describe('Linked Lists', () => {
  let dll;

  beforeEach(() => {
    dll = new LinkedList();
  });

  let toArray = l => {
    let array = [];
    let temp = l.head;
    while (temp) {
      array.push(temp.data);
      temp = temp.next;
    }

    return array;
  };

  let toArrayReverse = l => {
    let array = [];
    let temp = l.tail;
    while (temp) {
      array.push(temp.data);
      temp = temp.prev;
    }

    return array;
  };

  describe('Linked List Basics', () => {
    it('is empty when created', () => {
      expect(toArray(dll).length).toBe(0);
      expect(toArrayReverse(dll).length).toBe(0);
    });
  });

  // Adds a new node containing value to the front of llist
  // time: O(1)
  // insertFront(value) {};
  describe('insertFront()', () => {
    it('contains the number of items added', () => {
      dll.insertFront(1);
      dll.insertFront(1);
      expect(toArray(dll).length).toBe(2);
      expect(toArrayReverse(dll).length).toBe(2);
    });

    it('adds a new node containing value to the front', () => {
      dll.insertFront(10);
      expect(toArray(dll)).toEqual([10]);
      expect(toArrayReverse(dll)).toEqual([10]);
    });

    it('maintains the right order', () => {
      dll.insertFront(1);
      dll.insertFront(2);
      dll.insertFront(3);
      expect(toArray(dll)).toEqual([3, 2, 1]);
      expect(toArrayReverse(dll)).toEqual([1, 2, 3]);
    });
  });

  // Adds a new node containing value to the back of llist
  // time: O(n), where n is the length of llist
  // insertBack(value) { }
  describe('insertBack()', () => {
    it('contains the number of items added', () => {
      dll.insertBack(1);
      dll.insertBack(1);
      expect(toArray(dll).length).toBe(2);
      expect(toArrayReverse(dll).length).toBe(2);
    });

    it('adds a new node containing value to the back', () => {
      dll.insertBack(10);
      expect(toArray(dll)).toEqual([10]);
      expect(toArrayReverse(dll)).toEqual([10]);
    });

    it('maintains the right order', () => {
      dll.insertBack(1);
      dll.insertBack(2);
      dll.insertBack(3);
      expect(toArray(dll)).toEqual([1, 2, 3]);
      expect(toArrayReverse(dll)).toEqual([3, 2, 1]);
    });
  });

  // YOUR TESTS GO HERE
  // We strongly encourage you to write your own tests - they'll be easier to
  // debug than the image examples.
  // You should also write some tests that test traversing through the list
  // backwards (optionally using toArrayReverse, above), to check your
  // `prev` node references.
});
