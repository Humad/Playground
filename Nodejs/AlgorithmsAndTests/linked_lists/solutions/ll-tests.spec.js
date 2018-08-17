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

  let nodeToArray = n => {
    let array = [];
    while (n) {
      array.push(n.data);
      n = n.next;
    }
    return array;
  }

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

  describe('reverse()', () => {
    it('Reverses the elements in even length list', () => {
      dll.insertBack(1);
      dll.insertBack(2);
      dll.insertBack(3);
      dll.insertBack(4);
      dll.reverse();
      console.log("Reverse test 1", toArray(dll));
      expect(toArray(dll)).toEqual([4, 3, 2, 1]);
    });

    it('Reverses the elements in odd length list', () => {
      dll.insertBack(1);
      dll.insertBack(2);
      dll.insertBack(3);
      dll.reverse();
      console.log("Reverse test 2")
      expect(toArray(dll)).toEqual([3, 2, 1]);
    });

    it('lets list of length 1 be unchanged', () => {
      dll.insertBack(1);
      dll.reverse();
      console.log("Reverse test 3")
      expect(toArray(dll)).toEqual([1]);
    });

    it('lets list of length 0 be unchanged', () => {
      dll.reverse();
      console.log("Reverse test 4")
      expect(toArray(dll)).toEqual([]);
    });

    it('reverses list with different start and end', () => {
      dll.insertBack(1);
      dll.insertBack(2);
      dll.insertBack(3);
      dll.insertBack(4);
      dll.insertBack(5);
      dll.insertBack(6);
      var start = dll.head.next;
      var end = dll.tail.prev;
      console.log("Reverse test 5")
      dll.reverseHelper(start, end);
      expect(toArray(dll)).toEqual([1, 5, 4, 3, 2, 6]);
    }); 
  });

  describe('reverseNth(n)', () => {
    it('Reverses even length blocks in even length list', () => {
      dll.insertBack(1);
      dll.insertBack(2);
      dll.insertBack(3);
      dll.insertBack(4);
      dll.insertBack(5);
      dll.insertBack(6);
      dll.reverseNth(2);
      console.log("Reverse nth test 1");
      expect(toArray(dll)).toEqual([2, 1, 4, 3, 6, 5]);
    });

    it('Reverses even length blocks in odd length list', () => {
      dll.insertBack(1);
      dll.insertBack(2);
      dll.insertBack(3);
      dll.insertBack(4);
      dll.insertBack(5);
      dll.reverseNth(2);
      console.log("Reverse nth test 2");
      expect(toArray(dll)).toEqual([2, 1, 4, 3, 5]);
    });

    it('Reverses odd length blocks in odd length list', () => {
      dll.insertBack(1);
      dll.insertBack(2);
      dll.insertBack(3);
      dll.insertBack(4);
      dll.insertBack(5);
      dll.insertBack(6);
      dll.insertBack(7);
      dll.reverseNth(3);
      console.log("Reverse nth test 3");
      expect(toArray(dll)).toEqual([3, 2, 1, 6, 5, 4, 7]);
    });

    it('Reverses odd length blocks in even length list', () => {
      dll.insertBack(1);
      dll.insertBack(2);
      dll.insertBack(3);
      dll.insertBack(4);
      dll.reverseNth(3);
      console.log("Reverse nth test 4");
      expect(toArray(dll)).toEqual([3, 2, 1, 4]);
    });

    it('Reverses entire array when n > length', () => {
      dll.insertBack(1);
      dll.insertBack(2);
      dll.insertBack(3);
      dll.insertBack(4);
      dll.reverseNth(6);
      console.log("Reverse nth test 5");
      expect(toArray(dll)).toEqual([4, 3, 2, 1]);
    });
  });

  describe('waterfall()', () => {
    it('waterfalls even length linked list', () => {
      dll.insertBack(1);
      dll.insertBack(2);
      dll.insertBack(3);
      dll.insertBack(4);
      dll.insertBack(5);
      dll.insertBack(6);
      dll.waterfall();
      console.log("waterfall test 1");
      expect(toArray(dll)).toEqual([1, 3, 5, 2, 6, 4]);
    });

    it('waterfalls odd length linked list', () => {
      dll.insertBack(1);
      dll.insertBack(2);
      dll.insertBack(3);
      dll.insertBack(4);
      dll.insertBack(5);
      dll.waterfall();
      console.log("waterfall test 2");
      expect(toArray(dll)).toEqual([1, 3, 5, 4, 2]);
    });

    it('waterfalls empty linked list', () => {
      dll.waterfall();
      console.log("waterfall test 3");
      expect(toArray(dll)).toEqual([]);
    });

    it('waterfalls linked list with one element', () => {
      dll.insertBack(1);
      dll.waterfall();
      console.log("waterfall test 4");
      expect(toArray(dll)).toEqual([1]);
    });
  });

  describe('splitHelper()', () => {
    it('splits even length linked list', () => {
      dll.insertBack(1);
      dll.insertBack(2);
      dll.insertBack(3);
      dll.insertBack(4);
      var newHead = dll.splitHelper(dll.head, 2);
      console.log("splithelper test 1");
      expect(nodeToArray(newHead)).toEqual([3, 4]);
    });

    it('splits odd length linked list', () => {
      dll.insertBack(1);
      dll.insertBack(2);
      dll.insertBack(3);
      var newHead = dll.splitHelper(dll.head, 1);
      console.log("splithelper test 2");
      expect(nodeToArray(newHead)).toEqual([2, 3]);
    });

    it('splits empty linked list', () => {
      var newHead = dll.splitHelper(dll.head, 5);
      console.log("splithelper test 2");
      expect(nodeToArray(newHead)).toEqual([]);
    });

    it('splits linked list with 1 element', () => {
      dll.insertBack(1);
      var newHead = dll.splitHelper(dll.head, 1);
      console.log("splithelper test 2");
      expect(nodeToArray(newHead)).toEqual([]);
    });
  });

  describe('merge()', () => {
    it('merges linked lists with same lengths', () => {
      var list1 = new LinkedList();
      list1.insertBack(1);
      list1.insertBack(5);

      var list2 = new LinkedList();
      list2.insertBack(2);
      list2.insertBack(8);

      var result = list1.merge(list2.head, list1.head);
      expect(nodeToArray(result)).toEqual([1, 2, 5, 8]);
    });

    it('merges linked lists with different lengths', () => {
      var list1 = new LinkedList();
      list1.insertBack(1);
      list1.insertBack(5);
      list1.insertBack(7);
  
      var list2 = new LinkedList();
      list2.insertBack(2);
      list2.insertBack(8);
  
      var result = list1.merge(list1.head, list2.head);
      expect(nodeToArray(result)).toEqual([1, 2, 5, 7, 8]);
    });

    it('merges one list with an empty list', () => {
      var list1 = new LinkedList();
  
      var list2 = new LinkedList();
      list2.insertBack(2);
      list2.insertBack(8);
  
      var result = list1.merge(list1.head, list2.head);
      expect(nodeToArray(result)).toEqual([2, 8]);
    });

    it('merges empty lists', () => {
      var list1 = new LinkedList();
      var list2 = new LinkedList();
      var result = list1.merge(list1.head, list2.head);
      expect(nodeToArray(result)).toEqual([]);
    });
  });

  describe('mergesort()', () => {
    it('sorts a short linked list', () => {
      dll.insertBack(6);
      dll.insertBack(1);

      var result = dll.mergesort(dll.head, dll.length);
      expect(nodeToArray(result)).toEqual([1, 6]);
    });

    it('sorts a single element', () => {
      dll.insertBack(1);

      var result = dll.mergesort(dll.head, dll.length);
      expect(nodeToArray(result)).toEqual([1]);
    });

    it('sorts an even length linked list', () => {
      dll.insertBack(6);
      dll.insertBack(1);
      dll.insertBack(2);
      dll.insertBack(8);

      var result = dll.mergesort(dll.head, dll.length);
      expect(nodeToArray(result)).toEqual([1, 2, 6, 8]);
    });

    it('sorts an odd length linked list', () => {
      dll.insertBack(6);
      dll.insertBack(1);
      dll.insertBack(2);
      dll.insertBack(8);
      dll.insertBack(4);

      var result = dll.mergesort(dll.head, dll.length);
      expect(nodeToArray(result)).toEqual([1, 2, 4, 6, 8]);
    });
  });
});
