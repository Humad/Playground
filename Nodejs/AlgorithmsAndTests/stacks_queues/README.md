## Exercise Description

In this exercise you will practice applying recursive thinking and using stack and queue data structures.

> You should implement the functions below in `stackfun.js`

> Testing: You can test your code with `npm test`

## Recursion

### What is recursion?

Recursion is a way of thinking about problems that allows the computer to do more of the heavy lifting for us. It is analogous to the mathematical definition of functions, where you can define a function call in terms of other function calls and basic arithmetic operations, but not in terms of loops.

### Why recursion?

While being able to think recursively is one of the harder parts of computer science, it is also one of the most powerful. In fact, there are whole languages that entirely use recursion instead of loops, which, even though it may seem inefficient, leads to some very useful optimizations a compiler can make when dealing with such code. There are probably more problems in computer science that are simpler recursively than they are iteratively (using loops). Also, once you have a recursive algorithm, it is always possible to transform it into an iterative algorithm using a stack and a while loop. In this way, computer scientists can think about problems recursively, then use that recursive solution to make a fast iterative algorithm (and in the grand scheme of big-O notation, using recursion has little overhead compared to the rest of the running time). Here we’ll only ask you to do the first part.

### How do I write recursively?

Recursion just means calling a function within that function’s body. This may sound crazy, but in fact it is not. Let’s take an iterative function to calculate the factorial of a number n, n!:

```javascript
function factorial(n) {
    var result = 1;
    for (var i = 1; i <= n; i++) {
        result = result * i;
    }
    return result;
}
```

Okay, so four lines of code. Pretty short and understandable. Now let’s look at a recursive version:

```javascript
function factorial(n) {
    if (n === 0) return 1;
    return (factorial(n-1) * n);
}
```

Only two lines of code! (Depending on whether you like putting your return statement on the same line.) Even on such a small problem, recursion helps us express ourselves more concisely. This definition also fits more closely to the mathematical definition:

![](factorial.png)

A typical recursive function call consists of three parts. Let’s examine the function more closely to see them. Here’s the same code again, with more discussion.

```javascript
function factorial(int n)
{
    if (n === 0)   // Here is our base case.
        return 1;  // The base case is the smallest problem we can think of,
                   // one we know the answer to. This is the "n = 0" case in
                   // the mathematical definition.

    // (optional 'else' here)

    return (
        factorial(n-1) // This is our recursive step. Here we are solving a
                       //   smaller version of the same problem. We have to
                       //   make a leap of faith here - trust that our
                       //   solution to the (n-1) case is correct.  This is
                       //   the same as the mathematical definition, where
                       //   to figure out n!, we need to first figure out
                       //   (n-1)!
        * n   // Here is our incremental step. We are transforming
              //   our solution to the smaller problem into the
              //   solution to our larger problem. This is the
              //   same * n from the mathematical definition.
    );
}
```

### Stack and Queue classes

We've provided you with the Stack and Queue classes from lecture, in `stack.js` and `queue.js`.

## Recursive Exercises

> **No loops!**
>
> You may not use any loops for this section! Try to think about the problem
> recursively: in terms of a base case, a smaller problem, and an incremental
> step to transform the smaller problem to the current problem.

## Sum of Digits

Given a non-negative int n, return the sum of its digits recursively (no loops). Note that modulo (%) by 10 yields the rightmost digit (126 % 10 == 6), while divide (/) by 10 removes the rightmost digit (126 / 10 == 12).

```
int sumDigits(int n);
sumDigits(126) -> 1 + 2 + 6 -> 9
sumDigits(49)  -> 4 + 9     -> 13
sumDigits(12)  -> 1 + 2     -> 3
```

## Triangle
We have triangle made of blocks. The topmost row has 1 block, the next row down has 2 blocks, the next row has 3 blocks, and so on:

```
       *        1 block
     *   *      2 blocks
   *   *   *    3 blocks
 *   *   *   *  4 blocks
............... n blocks
```

Compute recursively (no loops or multiplication) the total number of blocks in such a triangle with the given number of rows.

```javascript
function triangle(rows) {

}

triangle(0) -> 0
triangle(1) -> 1
triangle(2) -> 3
```

> Note
>
> These examples were from http://codingbat.com/java/Recursion-1. If you are having a hard time with sum (below), we encourage you to go to CodingBat and try more recursive exercises. These are in Java, but there are links at the bottom of the page describing the differences of strings and arrays in Java from C++, which are minor.

## The `sum` Function

Write a function called sum that takes one stack by reference, and returns the sum of all the elements in the stack, leaving the original stack in the same state (unchanged). You may modify the stack, as long as you restore it to its original values. You may use only two local variables in your function. Hint: think recursively!

```javascript
function sum(stack) {

}
```

## The `scramble` Function
Non Recursive Exercise!

Your task is to write a function called scramble that takes one argument: a queue object.

```javascript
function scramble(queue) {

}
```

You may use whatever local variables you need. The function should reverse the order of SOME of the elements in the queue, and maintain the order of others, according to the following pattern:

1. The first element stays on the front of the queue.
1. Then the next two elements are reversed.
1. Then the next three elements are placed on the queue in their original order.
1. Then the next four elements are reversed.
1. Then the next five elements are place on the queue in their original order.
1. etc.

> Hint: You’ll want to make a local stack variable.

For example, given the following queue,

```
front                                         back
0   1 2   3 4 5   6 7 8 9   10 11 12 13 14   15 16
we get the following result:

front                                         back
0   2 1   3 4 5   9 8 7 6   10 11 12 13 14   16 15
```

Any “leftover” numbers should be handled as if their block was complete. (See the way 15 and 16 were treated in our example above.)

Good luck!


# The `MaxStack` class

Open `maxstack.js` and `maxstack.test.js` in Atom

Make a `MaxStack`, a stack data structure that supports
the normal stack operations: push, pop, isEmpty... but
also supports getting the maximum value currently on
the stack.

You may use one or two Stacks as instance variables
(in your constructor), but shouldn't need any other
instance (this.x) variables (no arrays, for example)

To test your `MaxStack`, you should add test cases to
`maxstack.test.js`, and then run `npm test`. Make sure
to cover pushing, popping, peekMaxing, isEmpty, and some
test cases where pushes, peekMaxes, and pops happen
interleaved with each other!


# The `TrickyQueue` class

Open `trickyqueue.js` and `trickyqueue.test.js` in Atom

Make a `TrickyQueue`, a queue data structure implemented
only with two stacks!

You should use two Stacks as instance variables
(in your constructor), but shouldn't need any other
instance (this.x) variables (no arrays or lists, for example)

To test your `TrickyQueue`, you should add test cases to
`trickyqueue.test.js`, and then run `npm test`. Make sure
to cover adding, removing, isEmpty, and some test cases where
adds and removes happen interleaved with each other!


# BONUS stackfun.js: The `verifySame` function

Write the recursive function verifySame whose function prototype is below. The function should return true if the parameter stack and queue contain only elements of exactly the same values in exactly the same order, and false otherwise (see example below). You may assume the stack and queue contain the same number of items!

We’re going to constrain your solution so as to make you think hard about solving it elegantly:

 * Your function may not use any loops
 * In your function you may only declare three local variables to use however you wish (*no other local variables can be used*)
 * After execution of verifySame, the stack and queue must be unchanged. Be sure to comment your code VERY well!

> Example:
>
> This stack and queue are considered to be the same. Note that we match the bottom of the stack with the front of the queue. No other queue matches this stack.
>
> ```
> Stack
> +---+
> | 1 | top
> +---+
> | 2 |              Queue
> +---+      +---+---+---+---+---+
> | 3 |      | 1 | 2 | 3 | 4 | 5 |
> +---+      +---+---+---+---+---+
> | 4 |      back            front
> +---+
> | 5 | bottom
> +---+
> ```

## Review: Practice Stack/Queue Questions

These questions don't involve any code; they only involve thinking about stacks
and queues. We recommend trying them. Talk with a friend if you get stuck!

Consider the following situations:

1. Consider a stack on which an intermixed sequence of push and pop operations are performed. The push operations put the numbers zero through nine in order on the stack and the pop operations print out the result of removing a number from the top of the stack. Which of the following sequence(s) could not occur?

   ```
   (a) 2 5 6 7 4 8 9 3 1 0
   (b) 4 6 8 7 5 3 2 9 0 1
   (c) 1 2 3 4 5 6 9 8 7 0
   (d) 0 4 6 5 3 8 1 7 2 9
   (e) 4 3 2 1 0 9 8 7 6 5
   (f) 2 1 4 3 6 5 8 7 9 0
   (g) 4 3 2 1 0 5 6 7 8 9
   (h) 1 4 7 9 8 6 5 3 0 2
   ```

2. Consider a queue on which an intermixed sequence of enqueue and dequeue operations are performed. The enqueue operations put the numbers zero through nine in order on the queue and the dequeue operations print out the result of removing a number from the front of the queue. Which of the following sequence(s) could not occur?

   ```
   (a) 0 1 2 4 5 3 6 7 9 8
   (b) 9 8 7 6 5 4 3 2 1 0
   (c) 0 1 2 3 4 6 5 7 9 8
   (d) 0 1 2 3 4 5 6 7 8 9
   ```

> Note:
>
> These exercises borrowed from UIUC's CS225 with regards to CS225 course staff
