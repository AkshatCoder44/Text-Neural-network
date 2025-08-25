function sig(x) {
  return 1 / (1 + Math.exp(-x));
}

function sigD(x) {
  let s = sig(x);
  return s * (1 - s);
}

// super simple "encoding" of text to number
function encode(text) {
  if (text === "hi") return 0.5;
  if (text === "hello") return 1.0;
  return 0.0;
}

// decode back (just for demo)
function decode(num) {
  return num > 0.75 ? "hello" : "hi";
}

let w = Math.random();
let b = Math.random();

let input = encode("hi");
let target = encode("hello");
let lr = 0.1;
let e = 10000;

for (let i = 0; i < e; i++) {
  let z = w * input + b;
  let output = sig(z);
  let error = output - target;
  let dout = error * sigD(z);
  w -= lr * dout * input;
  b -= lr * dout;
}

let result = sig(w * input + b);
console.log("Predicted number:", result);
console.log("Decoded as:", decode(result));
