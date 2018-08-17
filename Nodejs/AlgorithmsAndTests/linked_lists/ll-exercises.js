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
    // YOUR CODE HERE
  }

  /**
  * insertBack() -- Insertion Function
  *
  * Inserts a node with the parameter value into the list at the back.
  * This function SHOULD create a new ListNode.
  */
  insertBack(value) {
    // YOUR CODE HERE
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
  }

  /**
  * reverse() -- Reversal Function
  *
  * Reverses the current list.
  */
  reverse() {
    this.reverseHelper(this.head, this.tail);
  }

  /**
  * reverseNth() -- Block Reversal Function
  *
  * Reverses the current list in blocks of the given size.
  * You should use your reverse() helper function in this method.
  *
  * @param n Size of the blocks to be reversing.
  */
  reverseNth(n) {
    // YOUR CODE HERE
  }

  /**
  * waterfall() -- List Reordering Function
  *
  * Reorders the current list using the waterfall algorithm.
  */
  waterfall() {
    // YOUR CODE HERE
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
  }
}

window.LinkedList = LinkedList;
