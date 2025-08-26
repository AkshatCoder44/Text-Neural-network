function sig(x) { return 1 / (1 + Math.exp(-x)); }
function sigD(x) { let s = sig(x); return s * (1 - s); }

// weight & bias
let w = Math.random();
let b = Math.random();

let input = "A";
let target = "S";
let lr = 0.1;
let e = 10000;

function encode(ch) {
  return ch.charCodeAt(0) / 255; 
}
function decode(num) {
  return String.fromCharCode(Math.round(num * 255));
}

let x = encode(input);
let y = encode(target);
console.log(x)
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
console.log("Predicted:", decode(result));
