/**
 * Imports: import the stack from lecture~
 */
const Stack = require('./stack');

/**
 * Make a MaxStack, a stack data structure that supports
 * the normal stack operations: push, pop, isEmpty... but
 * also supports getting the maximum value currently on
 * the stack.
 *
 * You may use one or two Stacks as instance variables
 * (in your constructor), but shouldn't need any other
 * instance (this.x) variables (no arrays, for example)
 */
class MaxStack {

  /**
   * Constructor. You shouldn't need to change this function <3
   */
  constructor() {
    // Note: you may only need one of these variables
    this._stack1 = new Stack();
    this._stack2 = new Stack();
  }

  /**
   * Standard isEmpty function
   * Note: This should run in O(1) time
   */
  isEmpty() {

  }

  /**
   * Standard push function
   * Note: This should run in O(1) time
   */
  push(num) {

  }

  /**
   * Standard pop function
   * Note: This should run in O(1) time
   */
  pop() {

  }

  /**
   * Return the maximum value currently present anywhere
   * in the stack.
   *
   * Note: This should run in O(1) time ^_^
   */
  peekMax() {

  }
}

module.exports = MaxStack;
