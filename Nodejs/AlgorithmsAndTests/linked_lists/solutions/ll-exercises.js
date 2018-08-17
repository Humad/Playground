"use strict";

// we will be working with doubly linked lists
class ListNode {
  constructor(data) {
    this.data = data;

    this.next = null;
    this.prev = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
  * insertFront() -- Insertion Function
  *
  * Inserts a node with the parameter value into the list at the front.
  * This function SHOULD create a new ListNode.
  */
 insertFront(value) {
    let newHead = new ListNode(value);
    this.length++;
    if(this.head === null){
      this.head = newHead;
      this.tail = newHead;
    } else {
      newHead.next = this.head;
      this.head.prev = newHead;
      this.head = newHead;
    }
  }

  /**
  * insertBack() -- Insertion Function
  *
  * Inserts a node with the parameter value into the list at the back.
  * This function SHOULD create a new ListNode.
  */
  insertBack(value) {
    let newTail = new ListNode(value);
    this.length++;
    if(this.head === null){
      this.head = newTail;
      this.tail = newTail;
    } else {
      this.tail.next = newTail;
      newTail.prev = this.tail;
      this.tail = newTail;
    }
  }

  /**
  * reverseHelper() -- Reversal Helper
  *
  * Reverses the provided sequence of nodes, starting at `start`,
  * and ending at `tail`. The provided sequence may be a partial
  * list (a sequence of nodes inside a list), so try to handle
  * updating start.prev and end.next as well.
  *
  * @param start the first ListNode in the sequence
  * @param end the last ListNode in the sequence
  */
  reverseHelper(start, end) {
    // YOUR CODE HERE

    if (start == null) {
      return;
    }

    var originalPrev = start.prev;
    var originalNext = end.next;

    var current = start;
    while (current != null && current != originalNext) {
      var nextNode = current.next;
      var prevNode = current.prev;
      current.next = prevNode;
      current.prev = nextNode;
      current = current.prev;
    }

    if (originalPrev != null) {
      originalPrev.next = end;
    }
    end.prev = originalPrev;

    if (originalNext != null) {
      originalNext.prev = start;
    }
    start.next = originalNext;
  }

  /**
  * reverse() -- Reversal Function
  *
  * Reverses the current list.
  */
  reverse() {
    this.reverseHelper(this.head, this.tail);
    var temp = this.head;
    this.head = this.tail;
    this.tail = temp;
  }

  /**
  * reverseNth() -- Block Reversal Function
  *
  * Reverses the current list in blocks of the given size.
  * You should use your reverseHelper() function in this method.
  *
  * @param n Size of the blocks to be reversing.
  */
  reverseNth(n) {
    // YOUR CODE HERE

    if (n >= this.length) {
      this.reverse();
      return;
    }

    // Needed to set head
    var newHead = null;

    var start = this.head;
    var currentEnd = this.head.next;
    for (var i = 2; i <= this.length; i++) {
      console.log("Start=", start.data, "  End=", currentEnd.data);
      if (i % n === 0) {
        this.reverseHelper(start, currentEnd);
        newHead = newHead === null ? currentEnd : newHead;
        start = start.next;
        currentEnd = start;
      } else {
        currentEnd = currentEnd.next;
      }
    }

    this.head = newHead;
    var current = this.head;
    while (current != null && current.next != null) {
      current = current.next;
    }
    this.tail = current;
  }

  /**
  * waterfall() -- List Reordering Function
  *
  * Reorders the current list using the waterfall algorithm.
  */
  waterfall() {
    // YOUR CODE HERE
    var current = this.head;
    while (current != null && current.next != null && current.next != this.tail) {
      // Keep track of new next and prev;
      var newNext = current.next.next;
      var newPrev = current.next.prev;
      var nodeToRemove = current.next;

      // Set new next and prev (i.e: remove node)
      current.next = newNext;
      current.prev = newPrev;

      // Add to tail and set new tail
      this.tail.next = nodeToRemove;
      nodeToRemove.prev = this.tail;
      nodeToRemove.next = null;
      this.tail = nodeToRemove;

      // Move forward
      current = current.next;
    }
  }

  /**
  * splitHelper() -- Splitting Helper Function
  *
  * Splits the partial list that starts at the given node after the given
  * number of nodes. In other words, it should disconnect the list after the
  * given number of nodes, and return a pointer to the head of the new
  * partial list.
  *
  * This function SHOULD NOT create ANY new List objects.
  *
  * @param start ListNode denoting the "head" of the partial list to work on.
  * @param splitPoint Desired point to split the list into two.
  * @return Pointer to the head of the partial list that results from the split.
  */
  splitHelper(start, splitPoint) {
    // YOUR CODE HERE

    var current = start;
    while (current != null && splitPoint != 0) {
      current = current.next;
      splitPoint--;
    }

    if (current == null || splitPoint != 0) {
      return null;
    }

    // Disconnect
    if (current.prev != null) {
      current.prev.next = null;
    }
    current.prev = null;

    return current;
  }

  /**
  * split() -- Splitting Function
  *
  * Splits the list into two lists after the given number of nodes.
  *
  * @param splitPoint Number of nodes after which to split the list.
  * @return The List that is created after the split point.
  */
  split(splitPoint) {
    if(splitPoint > this.length) {
      return new LinkedList();
    }

    let secondHead = this.splitHelper(this.head, splitPoint);

    // set up current list
    this.tail = this.head;
    while(this.tail.next) {
      this.tail = this.tail.next;
    }
    let oldLength = this.length;
    this.length = splitPoint;

    // set up the returned list
    let result = new LinkedList();
    result.head = secondHead;
    result.tail = secondHead;
    while(result.tail.next) {
      result.tail = result.tail.next;
    }
    result.length = oldLength - splitPoint;
    return result;
  }

  /**
  * mergeWith() -- Merging Function
  *
  * Merges the given list into the current list. Assumes that both lists are
  * sorted.
  *
  * This function uses your `merge()` function and is used for rendering the
  * images to the screen.
  *
  * @param otherList List to be merged with. Should be left empty by the function.
  */
  mergeWith(otherList) {
    // set up the current list
    this.head = this.merge(this.head, otherList.head);
    this.tail = this.head;
    while(this.tail !== null && this.tail.next !== null) {
      this.tail = this.tail.next;
    }
    this.length = this.length + otherList.length;

    // empty out the parameter list
    otherList.head = null;
    otherList.tail = null;
    otherList.length = 0;
  }

  /**
  * merge() -- Merging Helper Function
  *
  * Merges two sorted partial lists (starting at first and second
  * respectively) into one partial list. The new partial list should have
  * the data elements in increasing order.
  *
  * This function SHOULD NOT create ANY new List objects.
  *
  * @param first Head of the first sorted partial list
  * @param second Head of the second sorted partial list
  * @return A pointer to the head of the new, merged partial list
  */

  merge(first, second) {
    // YOUR CODE HERE
    if (first == null) return second;
    if (second == null) return first;

    if (first.data > second.data) {
      return this.merge(second, first);
    }

    var current = first;
    var list1 = first.next;
    var list2 = second;

    while (list1 != null && list2 != null) {
      if (list1.data < list2.data) {
        current.next = list1;
        list1.prev = current;
        list1 = list1.next;
      } else {
        current.next = list2;
        list2.prev = current;
        list2 = list2.next;
      }
      current = current.next;
    }

    while (list1 != null) {
      current.next = list1;
      list1.prev = current;
      list1 = list1.next;
      current = current.next;
    }

    while (list2 != null) {
      current.next = list2;
      list2.prev = current;
      list2 = list2.next;
      current = current.next;
    }

    return first;
  }

  /**
  * sort() -- Mergesort Sorting Function
  *
  * Sorts the current list by applying the Mergesort algorithm.
  * This function (and any helpers it calls):
  * - SHOULD NOT allocate any new memory.
  * - SHOULD NOT create any new Lists.
  * - SHOULD NOT create any new ListNodes.
  *
  * You should implement the given helper functions to solve this.
  */
  sort() {
    if (this.length === 0) {
      return;
    }

    this.head = this.mergesort(this.head, this.length);
    this.tail = this.head;
    while(this.tail.next) {
      this.tail = this.tail.next;
    }
  }

  /**
  * mergesort() -- Sorting Helper Function
  *
  * Sorts the partial list given a start node and a size.
  * This is the recursive helper for the Mergesort algorithm
  * (i.e., this is the divide-and-conquer step).
  *
  * @param start ListNode denoting the "head" of this partial list.
  * @param chainLength Size of the partial list.
  */
  mergesort(start, chainLength) {
    // YOUR CODE HERE
    if (chainLength <= 1) {
      return start;
    }

    var mid = Math.floor(chainLength / 2);
    var leftList = start;
    var rightList = this.splitHelper(start, mid);
    var leftMerged = this.mergesort(leftList, mid);
    var rightMerged = this.mergesort(rightList, chainLength - mid);

    var result = this.merge(leftMerged, rightMerged);
    return result;
  }
}

window.LinkedList = LinkedList;
