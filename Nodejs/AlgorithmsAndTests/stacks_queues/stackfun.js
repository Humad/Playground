/**
 * Imports: import the stack and queue from lecture~
 */
const Stack = require('./stack');
const Queue = require('./queue');


/** sumDigits
 *
 * Given a non-negative int n, return the sum of its digits recursively (no
 * loops).
 *
 * @param n The number to sum the digits of @return The sum of its digits
 *
 * @note Note that mod (%) by 10 yields the rightmost digit (126 % 10 is 6),
 * while Math.floor and dividing (/) by 10 removes the rightmost digit
 * (Math.floor(126 / 10) is 12).
 *
 * Example: sumDigits(126) == 9 sumDigits(49) == 13 sumDigits(12) == 3
 */
function sumDigits(n) {

}


/** triangle
 *
 * We have triangle made of blocks. The topmost row has 1 block, the next row
 * down has 2 blocks, the next row has 3 blocks, and so on. Compute recursively
 * (no loops or multiplication) the total number of blocks in such a triangle
 * with the given number of rows.
 *
 *  @param rows The number of horizontal rows in the triangle.  @return The
 *  total number of blocks in the triangle pyramid.
 */
function triangle(rows) {

}


/**
 * Sums items in a stack.
 *
 * @param stack : A stack holding values to sum.
 *
 * @return The sum of all the elements in the stack, leaving the original
 *  stack in the same state (unchanged).
 *
 * @note You may modify the stack as long as you restore it to its original
 * values.
 *
 * @note You may not allocate additional memory in this function, such as
 * creating an array or a new object. You may create local variables, however.
 *
 * @hint Think recursively!
 */
function sum(stack) {
    // Your code here
}


/** scramble
 *
 * Reverses even sized blocks of items in the queue. Blocks start at size
 * one and increase for each subsequent block.
 *
 * @param queue : A queue of items to be scrambled
 *
 * @note Any "leftover" numbers should be handled as if their block was complete.
 *
 * @note This function does not have to be recursive
 *
 * @hint You'll want to make a local stack variable.
 */
function scramble(queue) {
    let stack = new Stack();
    // optional: queue2 = new Queue();

    // Your code here
}


/** BONUS: verifySame
 *
 * @return true if the parameter stack and queue contain only elements of
 * exactly the same values in exactly the same order; false, otherwise.
 *
 * @note You may assume the stack and queue contain the same number of items!
 *
 * @note There are restrictions for writing this function.
 * - Your function may not use any loops
 * - You may not allocate extra memory (such as other arrays, objects, stacks
 *   or queues)
 * - After execution of verifySame, the stack and queue must be unchanged.
 * - Try commenting your code afterwards to check you understand how it's
 *   working :)
 */
function verifySame(stack, queue) {


}


/**
 * File exports, for testing :)
 */
module.exports = {
  sumDigits: sumDigits,
  triangle: triangle,
  sum: sum,
  scramble: scramble,
  verifySame: verifySame,
};
