// You shouldn't need to access these!
// Only use the public functions on the Queue class :)
const front = Symbol('front');
const back = Symbol('back');

class Queue {
  constructor() {
    this[front] = null;
    this[back] = null;
    Queue._constructorCount++;
  }

  isEmpty() {
    return this[front] == null;
  }

  add(element) {
    if (this[back] == null) {
      this[front] = this[back] = { data: element, next: null };
    } else {
      this[back].next = { data: element, next: null };
      this[back] = this[back].next;
    }
  }

  remove() {
    if (this[front] == null) { return; }
    let result = this[front].data;
    this[front] = this[front].next;
    if (this[front] == null) this[back] = null;
    return result;
  }

  toString() {
    let curr = this[front];
    let str = 'Queue( ';

    while (curr != null) {
      str += curr.data + ' ';
      curr = curr.next;
    }

    str += ')';
    return str;
  }
}

Queue._constructorCount = 0;

module.exports = Queue;
