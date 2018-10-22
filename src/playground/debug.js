const disabledInfo = {
  salad: 0,
  bacon: 0,
  cheese: 4,
  meat: 2,
};

console.log(Object.keys(disabledInfo).map(igKey => {
  return disabledInfo[igKey];
}));

for (let key in disabledInfo) {
  // check if true then disable the specific ingredient button, i.e { salad: true, meat: false, etc. }
  disabledInfo[key] = disabledInfo[key] <= 0;
  key // ?
  disabledInfo // ?
  console.log(disabledInfo[key]);
}

const enoughDragonSpawned = Math.random() > 0.75; // ?

!enoughDragonSpawned // ?

if (!enoughDragonSpawned) {
  console.log('+1')
} else  {
  console.log('done');
}

function foo(x, y, z, w) {
  console.log(x, y, z, w);
}

function bar(x = 2, ...args) {
  return foo(x, 42, ...args);
}

const arr = [6, 5];

// console.log(bar(...arr));

const ingredients = {};

const param = ["salad", "1"]

console.log(ingredients[param[0]] = param[1])

console.log(ingredients);

const updatedIngredients = {
  salad: 2,
  bacon: 3,
  meat: 1,
};

[...Array(2)] // ? [ undefined, undefined ]
const transformedIngredients = Object.keys(updatedIngredients).map(igKey => {
    return [...Array(updatedIngredients[igKey])].map((_, i) => i) // ?
  }).reduce((arr, el) => {
    console.log(...arr);
    console.log(...el);
    console.log([...arr, ...el]);
    return [...arr, ...el]
  }, []); // ?

console.log(transformedIngredients);

