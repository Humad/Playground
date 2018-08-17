const assert = require('assert');
const Stack = require('./stack');
const Queue = require('./queue');

const { sumDigits, triangle, sum, scramble, verifySame } = require('./stackfun');

const array = Object.getOwnPropertySymbols(new Stack())[0];

// sumDigits
describe('sumDigits', () => {
  it('sumDigits_762', () => {
    assert.strictEqual(15, sumDigits(762));
  });

  it('sumDigits_0', () => {
    assert.strictEqual(0, sumDigits(0));
  });

  it('sumDigits_2', () => {
    assert.strictEqual(2, sumDigits(2));
  });

  it('sumDigits_1024', () => {
    assert.strictEqual(7, sumDigits(1024));
  });
});


// triangle
describe('triangle', () => {
  it('triangle_0', () => {
    assert.strictEqual(0, triangle(0));
  });

  it('triangle_1', () => {
    assert.strictEqual(1, triangle(1));
  });

  it('triangle_5', () => {
    assert.strictEqual(15, triangle(5));
  });

  it('triangle_10', () => {
    assert.strictEqual(55, triangle(10));
  });
});


// sum
describe('sum', () => {
  it('sum_136', () => {
    let s = new Stack();
    for (let i = 0; i <= 16; i++)
      s.push(i);
    const state = s[array].slice();

    Stack._constructorCount = 0;
    let resultSum = sum(s);

    assert.strictEqual(resultSum, 136);

    assert.deepStrictEqual(s[array], state, "Stack was modified");
    assert(Stack._constructorCount === 0,
      "You may not make a second stack object"
    );
  });

  it('sum_floats', () => {
    let s = new Stack();
    for (let i = 0; i <= 10; i++)
      s.push(4.1+3.5*i);
    const state = s[array].slice();

    Stack._constructorCount = 0;
    let resultSum = sum(s);

    if (resultSum < 237.59 || resultSum > 237.61) {
      assert.fail("Expected sum = 237.6; Actual = " + resultSum);
    }
    assert.deepStrictEqual(s[array], state, "Stack was modified");
    assert(Stack._constructorCount === 0,
      "You may not make a second stack object"
    );
  });
});


// scramble
describe('scramble', () => {
  it('scramble_17', () => {
    let q = new Queue();
    for (let i = 1; i <= 17; i++)
      q.add(i);

    scramble(q);

    scrambled_output = '';
    while (!q.isEmpty()) {
      scrambled_output += q.remove() + ' ';
    }

    assert.equal(scrambled_output, "1 3 2 4 5 6 10 9 8 7 11 12 13 14 15 17 16 ");
  });

  it('scramble_10', () => {
    let q = new Queue();
    for (let i = 5; i <= 14; i++)
      q.add(i);

    scramble(q);

    scrambled_output = '';
    while (!q.isEmpty()) {
      scrambled_output += q.remove() + ' ';
    }

    assert.strictEqual(scrambled_output, "5 7 6 8 9 10 14 13 12 11 ");
  });
});


// verifySame
describe('verifySame', () => {

  it('should return true if they are equal', () => {
    let s = new Stack();
    let q = new Queue();
    for (let i = 2; i < 7; i++) {
      s.push(i);
      q.add(i);
    }

    let result = verifySame(s, q);
    assert.strictEqual(result, true, "Expected true, returned " + result);
  });

  it('should return false for a difference', () => {
    let s = new Stack();
    let q = new Queue();
    for (let i = 2; i < 7; i++) {
      s.push(i);
      q.add(i);
    }
    s.push(4);
    q.add(6);
    for (let i = 7; i < 10; i++) {
      s.push(i);
      q.add(i);
    }

    let result = verifySame(s, q);
    assert.strictEqual(result, false, "Expected false, returned " + result);
  });

  it('should not modify the stack & queue when they are equal', () => {
    let s = new Stack();
    let q = new Queue();
    for (let i = 2; i < 7; i++) {
      s.push(i);
      q.add(i);
    }

    var s_state = s[array].slice();
    var q_state = q.toString();
    Stack._constructorCount = 0;
    Queue._constructorCount = 0;

    verifySame(s, q);

    assert.deepStrictEqual(s[array], s_state, "Stack was modified");
    assert.deepStrictEqual(q.toString(), q_state, "Queue was modified");
    assert(Stack._constructorCount === 0, "You may not make a second Stack");
    assert(Queue._constructorCount === 0, "You may not make a second Queue");
  });

  it('should not modify the stack & queue when there is a difference', () => {
    let s = new Stack();
    let q = new Queue();
    for (let i = 2; i < 7; i++) {
      s.push(i);
      q.add(i);
    }
    s.push(4);
    q.add(6);
    for (let i = 7; i < 10; i++) {
      s.push(i);
      q.add(i);
    }

    var s_state = s[array].slice();
    var q_state = q.toString();
    Stack._constructorCount = 0;
    Queue._constructorCount = 0;

    verifySame(s, q);

    assert.deepStrictEqual(s[array], s_state, "Stack was modified");
    assert.deepStrictEqual(q.toString(), q_state, "Queue was modified");
    assert(Stack._constructorCount === 0, "You may not make a second Stack");
    assert(Queue._constructorCount === 0, "You may not make a second Queue");
  });
});
