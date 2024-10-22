let map = new Map();

// Add new key-value pair
map.set('1', 'abc'); // key is string
map.set(1, 'def');   // key is number
map.set(true, 'ghi'); // key is boolean

console.log( map.get(1)   ); // 'num1'
console.log( map.get('1') ); // 'str1'

console.log(map.has('1'));
console.log(map.has('2'));

map.delete('1');

console.log(map);

map.clear();

console.log(map);

map[1] = 'value3'; // Works but as a property

console.log(map);

// Chaining
map.set('1', 'abc')
    .set(1, 'def')
    .set(true, 'ghi')
console.log(map);


// Convert array to map
let arr = [1, 2, 3, 4, 5];
let arrayToMap = new Map(arr.entries());
console.log(arrayToMap);


// Convert object to map
let obj = {
    name: 'John',
    age: 30
}
let objToMap = new Map(Object.entries(obj));
console.log(objToMap);

// Convert map to array
let test = Object.fromEntries(objToMap);
console.log(test);