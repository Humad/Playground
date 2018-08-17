# Linked Lists (Images and Lists)

You will be working on the Images & Lists exercise today. In this module you will learn to manipulate linked memory by writing functions to modify linked lists.

## Part 0: Setup
1. If you haven't, clone this repository with `git clone git@github.com:horizons-school-of-technology/job-prep.git`
1. Navigate to `job-prep/`
1. Pull the latest version of the job-prep repo with `git pull`
1. Navigate to `job-prep/linked-lists/`
1. Run `npx serve` to make a quick server for the folder
1. Open `localhost:5000`
1. Click on `ll-number-tests.html` (the very basic tests) and `ll-image-tests.html` (the complex tests)

You will use this page to test your code. Use the Jasmine tests at the bottom for Part 1, and the pictures for the rest (although we **highly recommend** writing out custom Jasmine test cases for your code). Write out tests in the `job-prep/linked-lists/ll-tests.spec.js` file where it says `// YOUR TESTS GO HERE`.

You should write your code in `job-prep/linked-lists/ll-exercises.js`

## Part 1: Insertion

#### `insertFront(data)`
Inserts a new node at the front of the List.

- This function takes a data element and prepends it to the beginning of the list.
- If the list is empty before insertFront is called, the list should have one element with the same value as the parameter.
- You may allocate new ListNodes.

**Parameters**:
- *data*: The data to be inserted

**Return Value**: None

#### `insertBack(data)`
Inserts a new node at the back of the List.

- This function takes a data element and appends it to the end of the list.
- If the list is empty before insertBack is called, the list should have one element with the same value as the parameter.
- You may allocate new ListNodes.

**Parameters**:
- *data*: The data to be inserted

**Return Value**: None

### Testing
Scroll to the bottom of `http://localhost:5000/ll-number-tests.html` and make sure the test cases for the above functions are passing.

## Part 2: Node Manipulation

#### `reverseHelper(start, end)`
Helper function to reverse a sequence of ListNodes.

**Parameters**:

 * *start*: the first ListNode in the sequence
 * *end*: the last ListNode in the sequence

**Return Value**: None

#### `reverseNth(n)`
Reverses blocks of size `n` in the current List.

- This function accepts as a parameter an integer, n, and reverses blocks of n elements in the list.
- The order of the blocks should not be changed.
- If the final block (that is, the one containing the tail) is not long enough to have n elements, then reverse what remains in the list. In particular, if n is larger than the length of the list, this will do the same thing as reverse.
- You may NOT allocate new ListNodes. You should modify the existing ListNodes to put them in the correct order.

**Parameters**:
- *n*: The number of elements in the LinkedList to reverse

**Return Value**: None

#### `waterfall()`
Modifies the List using the waterfall algorithm.

- This function modifies the list in a cascading manner as follows.
- Every other node (starting from the second one) is removed from the list, but appended at the back, becoming the new tail.
- This continues until the next thing to be removed is either the tail (not necessarily the original tail!) or `null`.
- You may NOT allocate new ListNodes. You should modify the existing ListNodes to put them in the correct order.
- Note that since the tail should be continuously updated, some nodes will be moved more than once.

**Parameters**: None

**Return Value**: None

### Testing
Once you have completed reverse, reverseNth, or waterfall functions you should scroll the the appropriate picture and press on the **Run Reverse**, **Run Reverse Nth**, and **Run Waterfall** buttons. Make sure the output picture looks like the provided solution picture.

## Part 3: Sorting

#### `splitHelper(start, splitPoint)`
Helper function to split a sequence of linked memory at the node `splitPoint` steps after `start`.

In other words, it should disconnect the sequence of linked memory after the given number of nodes, and return the starting node of the new sequence of linked memory.

- This function takes in a node `start` and an integer `splitPoint` and splits the chain of ListNodes into two completely distinct chains of ListNodes after `splitPoint` many nodes.
- The split happens after `splitPoint` number of nodes, making that the `head` of the new sublist, which should be returned. In effect, there will be `splitPoint` number of nodes remaining in the current list.
- You may NOT allocate new ListNodes

**Parameters**:
- *start*: The starting node from where you start counting
- *splitPoint*: An integer representing the number of nodes *after* `start` you want to count

**Return Value**: LinkedList

#### `merge(first, second)`
Helper function to merge two sorted and independent sequences of linked memory. The result should be a single sequence that is itself sorted. This function SHOULD NOT create ANY new List objects.

- This function takes in two nodes, the heads of two sublists and merges the two lists into one in sorted order (increasing).
- You can assume both lists are sorted, and the final list should remain sorted.
- You may NOT allocate new ListNodes
- In order to COMPARE two ListNodes you should compare `ListNode.data.idx` as the `data` looks like the below object. The INTEGERs are in the correct order.
    ```
    {
      "idx": INTEGER,
      "imageData": ImageData
    }
    ```

**Parameters**:
- *first*: The starting node of the first sequence
- *second*: The starting node of the second sequence

**Return Value**: The starting ListNode of the resulting, sorted sequence.

#### `mergesort(start, chainLength)`
Sorts a chain of linked memory given a start node and a size. This is the recursive helper for the Mergesort algorithm (i.e., this is the divide-and-conquer step).

- This function sorts the list using the [merge sort algorithm](https://en.wikipedia.org/wiki/Merge_sort).
- You should use the private helper functions you wrote above to help you solve this problem.
- You may NOT allocate new ListNodes
- In order to COMPARE two ListNodes you should compare `ListNode.data.idx` as the `data` looks like the below object. The INTEGERs are in the correct order.
    ```
    {
      "idx": INTEGER,
      "imageData": ImageData
    }
    ```

**Parameters**:
- *start*: The starting point of the chain
- *chainLength*: Size of the chain to be sorted

**Return Value**: The starting ListNode of the resulting, sorted sequence.

**Merge Sort — Algorithm Details**

Merge Sort is a recursive sorting algorithm that behaves as follows:

- **Base Case**: A list of size 1 is sorted. Return.
- **Recursive Case**:
    - Split the current list into two smaller, more manageable parts
    - Sort the two halves (this should be a recursive call)
    - Merge the two sorted halves back together into a single list

In other words, Merge Sort operates on the principle of breaking the problem into smaller and smaller pieces, and merging the sorted, smaller lists together to finally end up at a completely sorted list.

### Testing
Once you have completed split, merge, and mergesort you should scroll the the appropriate picture and press on the **Run Split**, **Run Merge**, **Run Mergesort** buttons. Make sure the output picture looks like the provided solution picture.

## Part 4: Congrats!
You're done, give yourself a pat on the back!

> Note: This is heavily based on the UIUC CS 225 Images & Lists assignment. Thanks to CS 225 course staff for their work on coming up with these problems!

