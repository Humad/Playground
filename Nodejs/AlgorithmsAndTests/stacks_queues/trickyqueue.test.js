const assert = require('assert');
const TrickyQueue = require('./trickyqueue');

describe('TrickyQueue', () => {
  it('should start empty', () => {
    let tq = new TrickyQueue();
    assert.strictEqual(tq.isEmpty(), true);
  });

  it('you should write more tests here!', () => {
    throw 'you should write a test here :)';
  });
});


