/* eslint-disable */
// REMEMBER: Arrays & Objects are reference type

// #1. Pure Function - Predictable return state
class ProfileManager {
  constructor() {}

  // Writing Pure Function
  createUsername(user) {
    return `${user.firstName} ${user.lastName} ${user.id}`;
  }

  createProfile(domain, username) {
    return `Domain: ${domain}, Username: ${username}`;
  }
}

const user = {
  id: 7865,
  firstName: 'John',
  lastName: 'Doe',
};

const manager = new ProfileManager();
const profileUrl = manager.createProfile('https://social.com', manager.createUsername(user));
console.log(profileUrl);

// #2. Avoiding Side effects with
// Object.assign(target, source) - copies all enumerable own properties of the sources to the target object
// Spread Operator - copies all enumerable properties

const readings = {
  coreTemp: 74,
  additionalTemp: 80,
  readingA: 178,
  readingB: 120,
  readingC: -190,
};

function adjustReadings(reading) {
  reading.readingA -= 20;
  reading.readingB += reading.coreTemp / 2;
  return reading;
}

function testReadingA(readingA) {
  return readingA >= 170;
}

readings; // ?
const newReadingsUsingSpread = adjustReadings({ ...readings });
newReadingsUsingSpread; // ?
testReadingA(readings.readingA); // ?
const newReadingsUsingObject = adjustReadings(Object.assign({}, readings));
newReadingsUsingObject; // ?

// #3.
// forEach - accepts function argument and then iterates over every object or item in the array calling that function to that object
// map - same as forEach but constructs an entirely new array from the values return from the function

const tasks = [
  { task: 'Buy eggs', completed: false },
  { task: 'Buy eggs', completed: true },
  { task: 'Buy eggs', completed: true },
  { task: 'Buy eggs', completed: false },
];

function makePending(tasks) {
  // tasks.forEach((task, index) => {
  //   task.completed = false;
  // });
  return tasks.map((tasked, index) => ({
    ...tasked,
    id: index + 1,
  }));
}

tasks; // ?
const newPending = makePending(tasks);
newPending; // ?

// #4 Reduce - returns always a single value

// Task: Iterate all numbers
// If a number is even -> take its half a nd sum it
// If a number is odd -> sum it

const numbers = [2, 9, 8, 7, 6];

function isEven(num) {
  return num % 2 === 0;
}

function numberSum(number) {
  // accumulator holds the total
  return number.reduce((accumulator, current) => {
    if (isEven(current)) {
      return accumulator + current / 2;
    }
    return accumulator + current;
  }, 0);
}

const total = numberSum(numbers);
total; // ?

const reviews = [4.5, 4.0, 5.0, 2.0, 1.0, 5.0, 3.0, 4.0, 1.0, 5.0, 4.5, 3.0, 2.5, 2.0];

// 1. Using the reduce function, create an object that
// has properties for each review value, where the value
// of the property is the number of reviews with that score.
// for example, the answer should be shaped like this:
// { 4.5: 1, 4.0: 2 ...}

const reviewSummary = reviews.reduce((obj, item) => {
  // check if there's object key:value exist or set to zero to work with at all and store it on count
  const count = obj[item] || 0; // ?
  [item] // ?
  obj[item] // ?
  // copy all obj then add/update the item that is on queue
  return { ...obj, [item]: count + 1 };
}, { '4.5': 2 });

console.log(reviewSummary);
//
// TIP: checkout computed properties discussed here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names
// solution can be found at:
// https://jsbin.com/himuzuw/1/edit?js,console


// #5 Filter - Get the portion of an array

const EvenOddNumbers = [6, 8, 3, 14, 1, 9, 10];

function getEvenNumbers(numerals) {
  return numerals.filter(num => num % 2 === 0);
}

console.log(getEvenNumbers(EvenOddNumbers));

const ingredients = [{ name: 'cheese', quantity: 2 }, { name: 'meat', quantity: 1 }, { name: 'salad', quantity: 1 }];

const addItem = (arrObj, newObj) => [...arrObj, newObj];

const nextWeekShoppingList = addItem(ingredients, { name: 'bacon', quantity: 2 });

nextWeekShoppingList; // ?

// 1. create a constant named friends,
// which is an array that contains 2
// names of your choosing.

const friends = [
  { name: 'Barbara' },
  { name: 'Barry' },
];

console.log(friends);

// 2. Create a new constant named updatedFriends,
// which includes the friends array values plus
// one additional name

const newFriend = { name: 'Leigha' };
const updatedFriends = [...friends, newFriend];

console.log(updatedFriends);

// 3. Create a new constant named friendNameLengths,
// which is based on the array updatedFriends,
// but instead of having the friends names,
// have the array store the length of each persons name

const friendNameLengths = updatedFriends.map(friend => friend.name.length);

console.log(friendNameLengths);

const friendLove = updatedFriends.map(friend => {
  if(friend.name === 'Leigha') {
    return {
        ...friend,
        love: 'Barry'
    }
  }
  return friend;
});

console.log(friendLove); // ?

// 4. Create a new constant named shorterNamedFriends,
// which will be a list of the friends except the friend with the longest name.

const shorterNameFriends = updatedFriends.filter(friend => friend.name.length < 7);

console.log(shorterNameFriends);
