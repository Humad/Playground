# Binary Trees Exercise

In this exercise we’ll explore some fun helper functions for binary
trees, learn about creating helper functions and thinking recursively, and
hopefully see some fancy ascii trees on the terminal! 

## Helper Functions and Recursion

You’ll want to be thinking about the following problems recursively. To do
this, though, **you’ll have to make your own helper functions** to help
implement the functions, so that you can recursively act differently on
different nodes. A helper function stub for height() has been provided for you.

## The height() Function

There is a function called height() that returns the height of the binary tree.
Recall that the height of a binary tree is just the length of the longest path
from the root to a leaf, and that the height of an empty tree is -1.

We have implemented height() for you (see binary-tree.js) to help you get a
sense of recursive functions. Please read through the code, and ask questions
if you are unsure of how it finds the height of a tree.

## The printLeftToRight() Function

There is a function called printLeftToRight() that prints out the values of the
nodes of a binary tree in order. That is, everything to the left of a node will
be printed out before that node itself, and everything to the right of a node
will be printed out after that node.

We have implemented printLeftToRight() for you (see binary-tree.java). Please
read through the code, and ask questions if you are unsure of how it works.
Note that printLeftToRight() uses an
[in-order-traversal](https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/)
to print out the nodes of a tree. You will need to use one of the three
traversals for some of the following functions.

## The mirror() Function

The mirror() function should flip our tree over a vertical axis, modifying the
tree itself (not creating a flipped copy).

For example, if our original tree was

```
                        ______ 8 ______
                 ______/               \______
            __ 5 __                            9 __
         __/       \__                             \__
       2               7                               10
     /   \           /
   1       4       6
          /
         3
```         
         
Our mirrored tree would be

```
                        ______ 8 ______
                 ______/               \______
            __ 9                            __ 5 __
         __/                             __/       \__
       10                              7               2
                                         \           /   \
                                           6       4       1
                                                    \
                                                     3
```

## The isOrdered() Function

The isOrdered() function returns true if an in-order traversal of the tree
would produce a nondecreasing list output values, and false otherwise. (This is
also the criterion for a binary tree to be a binary search tree.)

For example, isOrdered() should return true on the following tree:

```
           __ 5 __
        __/       \__
      1               8
        \
          2
           \
            4
```

but false for

```
           __ 5 __
        __/       \__
      1               8
        \
          2
           \
            11
```

<blockquote><details>
<summary>Hint:</summary>

What conditions need to be true for a tree to be in order (as defined above)?
How can we check this recursively?

</details></blockquote>

> Testing: To test your function, run `node main.js`, then compare your output to `solution-output.txt`.

## The printPaths() Function

Good work! printPaths() will console.log
all the possible paths from the root of the tree to any leaf node — all
sequences starting at the root node and continuing downwards, ending at a leaf
node. Paths ending in a left node should be printed before paths ending in a
node further to the right. For example, for the following tree

```
            __ 1 __
         __/       \__
       2               3
     /   \           /   \
   4       8       6       7
  / \                     /
 5   10                  9
```

there will be 5 paths, and each path will look like this:

```
paths 0: 1 2 4 5
paths 1: 1 2 4 10
paths 2: 1 2 8
paths 3: 1 3 6
paths 4: 1 3 7 9
```

<blockquote><details>
<summary>Hint:</summary>

You’ll need to keep track of the whole path that you took to arrive at any
point in your traversal, so you can print your entire path when you get to a leaf
node. Adding to and removing from an array as you traverse the tree might be helpful.

</details></blockquote>

> Testing: To test your function, run `node main.js`, then compare your output to `solution-output.txt`.

## The sumDistances() Function

Good job getting this far! Each node in a tree has a distance from the root
node - the depth of that node, or the number of edges along the path from that
node to the root. sumDistances() returns the sum of the distances of all nodes
to the root node (the sum of the depths of all the nodes). Your solution should
take O(n) time, where n is the number of nodes in the tree. For example, on the
following tree:

```
           __ 5 __
        __/       \__
      0               8
        \
          2
         / \
        1   4
```

`sumDistances()` should return `0 + 1 + 2 + 3 + 3 + 1 = 10`.

<blockquote><details>
<summary>Hint:</summary>

You'll want to write a recursive helper function, and you'll probably want to
give it an extra parameter—what would you like to know when you're visiting a
node?

</details></blockquote>

> Testing: To test your function, run `node main.js`, then compare your output to `solution-output.txt`.

