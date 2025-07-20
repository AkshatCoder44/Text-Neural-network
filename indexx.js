function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function sigmoidDerivative(x) {
  let s = sigmoid(x);
  return s * (1 - s);
}

const vocab = ["happy", "sad", "love"];

function textToVector(text) {
  const tokens = text.toLowerCase().split(" ");
  return vocab.map(word => tokens.includes(word) ? 1 : 0);
}

const trainingData = [
  { text: "happy love", target: 1 },
  { text: "sad", target: 0 },
  { text: "happy", target: 1 },
  { text: "sad love", target: 0 }
];

let weights = vocab.map(() => Math.random());
let bias = Math.random();
const lr = 0.1;

for (let epoch = 0; epoch < 1000; epoch++) {
  for (const { text, target } of trainingData) {
    const input = textToVector(text);
    const z = input.reduce((sum, x_i, i) => sum + x_i * weights[i], 0) + bias;
    const output = sigmoid(z);
    const error = output - target;
    const dOutput = error * sigmoidDerivative(z);
    for (let i = 0; i < weights.length; i++) {
      weights[i] -= lr * dOutput * input[i];
    }
    bias -= lr * dOutput;
  }
}

function predict(text) {
  const input = textToVector(text);
  const z = input.reduce((sum, x_i, i) => sum + x_i * weights[i], 0) + bias;
  return sigmoid(z);
}

console.log("happy love:", predict("happy love").toFixed(4));
console.log("sad:", predict("sad").toFixed(4));
console.log("love:", predict("love").toFixed(4));
console.log("happy sad:", predict("happy sad").toFixed(4));
