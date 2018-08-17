console.log('let randomness = [');
for (let i = 0; i < 1000; i++) {
  console.log('  ' + Math.random() + ',');
}
console.log('];');
console.log('let i = -1;');
console.log('module.exports = function() {');
console.log('  i = (i + 1) % randomness.length;');
console.log('  return randomness[i];');
console.log('};');
