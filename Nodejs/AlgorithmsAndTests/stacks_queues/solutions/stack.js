// You shouldn't need to access this!
// Only use the public functions on the Queue class :)
const array = Symbol('array');

class Stack {
  constructor() {
    this[array] = [];
    Stack._constructorCount++;
  }

  isEmpty() {
    return this[array].length === 0;
  }

  push(element) {
    this[array].push(element);
  }

  pop() {
    return this[array].pop();
  }
}

Stack._constructorCount = 0;

module.exports = Stack;
