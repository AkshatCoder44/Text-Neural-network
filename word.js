function sig(x) { return 1 / (1 + Math.exp(-x)); }
function sigD(x) { let s = sig(x); return s * (1 - s); }

// weight & bias
let w = Math.random();
let b = Math.random();

let input = "HELLO";
let target = "WORLD";
let lr = 0.1;
let e = 10000;

// Encode a word into a number
function encode(word) {
  let sum = 0;
  for (let i = 0; i < word.length; i++) {
    sum += word.charCodeAt(i);
  }
  return sum / (255 * word.length); // normalize to [0,1]
}

// Decode number back into word approximation
function decode(num, length = 5) {
  let avgCode = Math.round(num * 255);
  let str = "";
  for (let i = 0; i < length; i++) {
    str += String.fromCharCode(avgCode);
  }
  return str;
}

let x = encode(input);
let y = encode(target);

for (let i = 0; i < e; i++) {
  let z = w * x + b;
  let output = sig(z);

  let error = output - y;
  let dout = error * sigD(z);

  w -= lr * dout * x;
  b -= lr * dout;
}

// test: neuron output decoded as text
let result = sig(w * x + b);
console.log("Predicted:", decode(result, target.length));
