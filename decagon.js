let person = {
  name: "wealth",
  age: 23,
};

// console.log(person[age]);

let string = ["code", "javascript", "algorithmn"];

string.map((element) => console.log(element + ":" + element.length));

let con = string.filter((element) => element.length > 5);
console.log(con);

for (i = 0; i < 10; i += 2) {
  console.log(i);
}

for (i = 20; i > 2; i -= 2) {
  console.log(i);
}

let numbs = [1, 2, 3, 4, 5, 6];
let sum = 0;

// iterating using for of loop
// for (element of numbs) {
//   sum += element;
// }
// console.log("The answer is" + " : " + sum);

// iterating using for loop
// for (i = 0; i <= numbs.length; i++) {
//   sum += i;
// }

// console.log(sum);

// iterating using for Each loop
numbs.forEach((element) => console.log((sum += element)));

// let sums = 0;
// for (i = 0; i <= 6; i++) {
//   sums += i;
// }

// console.log(sums);

let sumEven = 0;
let sumOdd = 0;
for (i = 0; i < 10; i++) {
  if (i % 2 == 0) {
    sumEven += i;
  } else {
    sumOdd += i;
  }
}

console.log(
  ` The sum of even numbers is ${sumEven}, The sum of odd numbers is ${sumOdd}`
);

let score = [1, 2, 3, 4, 5, 5, 5, 6, 14];
let meanSum = 0;
for (i = 0; i <= score.length; i++) {
  meanSum += i;
  mean = meanSum / score.length;
}

console.log(mean);

const products = [
  { product: "mango", price: 5 },
  { product: "apple", price: 5 },
  { product: "orange", price: "" },
  { product: "gauva", price: "" },
];

const vals = products.filter((element) => element.price > 4);

console.log(vals);
