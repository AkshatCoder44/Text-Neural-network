function sig(x) { return 1 / (1 + Math.exp(-x)); }
function sigD(x) { let s = sig(x); return s * (1 - s); }

// ---- INPUTS (same length for simplicity) ----
let input = "CAT";
let target = "DOG";

let lr = 0.1;
let e  = 20000;

// encode/decode whole words as arrays of numbers
function encodeWord(word) {
  return word.split("").map(ch => ch.charCodeAt(0) / 255);
}
function decodeWord(nums) {
  // clamp to printable ASCII so we don't land on weird symbols
  return nums.map(num => {
    let code = Math.round(num * 255);
    code = Math.max(32, Math.min(126, code));
    return String.fromCharCode(code);
  }).join("");
}

let x = encodeWord(input);
let y = encodeWord(target);

// one neuron per character position: w[j], b[j]
let w = x.map(() => Math.random());
let b = x.map(() => Math.random());

// ---- TRAIN ----
for (let i = 0; i < e; i++) {
  for (let j = 0; j < x.length; j++) {
    let z = w[j] * x[j] + b[j];
    let out = sig(z);

    let err  = out - y[j];
    let dout = err * sigD(z);

    w[j] -= lr * dout * x[j];
    b[j] -= lr * dout;
  }
}

// ---- TEST ----
let outArr = x.map((xi, j) => sig(w[j] * xi + b[j]));
console.log("Predicted:", decodeWord(outArr));
