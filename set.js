let set = new Set();

let item1 = { price: 10, quantity: 2 };
let item2 = { price: 5, quantity: 3 };
let item3 = { price: 10, quantity: 2 };

set.add(item1)
    .add(item2)
    .add(item3);

console.log(set);


// Iterate over set
for (let item of set) {
    console.log(item.price);
}

let i = 1;
set.forEach((value, valueAgain, set) => {
    console.log("Iteration " + i++);
    console.log(value.price);
    // console.log(valueAgain.price);
});
