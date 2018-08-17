/**
 * Imports: import the stack from lecture~
 */
const Stack = require('./stack');

/**
 * Make a TrickyQueue, a queue data structure implemented
 * only with two stacks!
 *
 * You should use two Stacks as instance variables
 * (in your constructor), but shouldn't need any other
 * instance (this.x) variables (no arrays or lists, for example)
 */
class TrickyQueue {

  /**
   * Constructor. You shouldn't need to change this function <3
   */
  constructor() {
    // You shouldn't need any other variables here <3
    this._stack1 = new Stack();
    this._stack2 = new Stack();
  }

  /**
   * Standard isEmpty function
   * Note: This should run in O(1) time on average
   */
  isEmpty() {

  }

  /**
   * Standard add function: add an element to the back of the queue
   * Note: This should run in O(1) time on average
   */
  add(element) {

  }

  /**
   * Standard remove function: remove an element to the front of the queue
   * Note: This should run in O(1) time on average
   */
  remove() {

  }
}

module.exports = TrickyQueue;
