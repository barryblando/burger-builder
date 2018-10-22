// --------------------------------------
// Updating objects, in an immutable way
// --------------------------------------

const meal = {
  description: 'Dinner',
};
// 1. In an Immutable way, add a property to the
// meal called calories setting it's value to 200,
// then log the result to the console

const mealWithCalories = {
  ...meal,
  calories: 200
};

console.log(mealWithCalories);

// 2. In an Immutable way, increase the calories
// by 100 and print the result to the console

const mealWithIncreasedCalories = {
  ...mealWithCalories,
  calories: mealWithCalories.calories + 100,
};

console.log(mealWithIncreasedCalories);

// 3. In an Immutable way, remove the calories property and log the result to the console

const {calories, ...mealWithOutCalories} = mealWithIncreasedCalories;


console.log(mealWithOutCalories);

// --------------------------------------
// Updating arrays, in an immutable way
// --------------------------------------

// 1. create a constant named friends, which is an array that contains 2 names of your choosing.

const friends = ['Nate', 'Michael'];

// 2. Create a new constant named updatedFriends, which includes the friends array values plus one additional name

const updatedFriends = [...friends, 'Dustin'];

// 3. Create a new constant named friendNameLengths, which is based on the array updatedFriends, but instead of having the friends names, have the array store the length of each persons name.

const friendNameLengths = updatedFriends.map(nameToLength);

function nameToLength (name) {
  return name.length;
}

// 4. Create a new constant named shorterNamedFriends, which will be a list of the friends except the friends with the longest name.
const maxFriendLength = Math.max(...friendNameLengths);

const shorterNamedFriends = updatedFriends.filter(
  function(name){
    return name.length < maxFriendLength ;
  });

// 5. Print each constant to the console.

console.log(friends, updatedFriends, friendNameLengths, shorterNamedFriends);
