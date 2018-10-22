// -- COERCION --

/**
 * ABSTRACT VALUE OPERATIONS OF COERCION
 *
 * ToString:
 * null       : "null"
 * undefined  : "undefined"
 * true       : "true"
 * false      : "false"
 * 3.14159    : "3.4"
 * 0          : "0"
 * -1         : "0"
 *
 * ToString(Array):
 * []                   : "" -empty string
 * [1, 2, 3]            : "1,2,3"
 * [null, undefined]    : ","
 * [[[], [], []], []]   : ",,,"
 * [,,,,]               : ",,,"
 *
 * ToString(Object)
 * {}                   : "[object Object]"
 * {a:2}                : "[object Object]"
 *
 * ToNumber:
 * ""         : 0
 * "0"        : 0
 * "-0"       : -0
 * " 009 "    : 9
 * "3.14159"  : 3.14159
 * "0."       : 0
 * ".0"       : 0
 * "."        : NaN
 * "0xaf"     : 175
 * false      : 0
 * true       : 1
 * null       : 0
 * undefined  : NaN
 *
 * ToPrimitive/ToNumber(Array):
 * [""]         : 0
 * ["0"]        : 0
 * ["-0"]       : -0
 * [null]       : 0
 * [undefined]  : 0
 * [1,2,3]      : NaN
 * [[[[]]]]     : 0
 */

/**
 * Falsy - False
 * ""
 * 0, +0, -0
 * null
 * NaN
 * false
 * undefined
 */

 /**
 * Truthy - True
 * "foo"
 * 23
 * { a:1 }
 * [1, 23]
 * true
 * function(){..}
 * ...
 */

/**
 * INFO: LEGEND
 * ->   : convert/coerce
 */

// TYPES OF COERCION
// EXPLICIT: it's obvious from the code that you're doing it, conversion of types to other types
// IMPLICIT: happens as a side effect of some other operation (e.g logical operator double equal)

/**
 * PRO TIP:
 * EXPLICIT COERCION - use where it's safer
 * IMPLICIT COERCION - use where it's more helpful
 */

// EXPLICIT

console.log(+"123"); // turn string number to actual abstract value: number

// undefined = false, if flip to boolean value = true, if use double negate it will flip it back again to original Abstract value: false
!!undefined // ? false

// string = true, if flip to boolean value = false, if use double negate it will flip it back again to original Abstract value: true
!!"123" // ? true

// explicity implicit coercion using ternary operator (?:)
12 > 3 ? true : false; // ?

// IMPLICIT

var foo = "123";

if (foo) {
  console.log('Sure.'); // true, turns string to actual boolean value
}

foo = 0;

if (foo) {
  console.log('Right.'); // false, turns zero to actual boolean value
}

foo = []; // ?

// double equal(coercive equality) isn't doing any boolean coercion, double equal prefers to compare numbers (number coercion)

if (foo == false) {
  console.log('Yup!'); // true, 'cause [] -> "" -> 0 == false -> 0
}

// LOGICAL OPERATORS

/**
 * As logical expressions are evaluated left to right, they are tested for possible "short-circuit" evaluation using the following rules:
 * false && (anything) is short-circuit evaluated to false.
 * true || (anything) is short-circuit evaluated to true. Or Operator does a truthy test on the first argument/operand.
 */

// DEBUGGING IN REACT: Implicit Returns

// const Dogs = props => console.log(props) || <p>There are {props.dogs.length} Dogs!</p>

/**
 * Since console.log() returns nothing/undefined, undefined will be coerce to falsy. Then jsx syntax will be outputted.
 */

// IF YOU ARE DEBUGGING SOMETHING IN THE MIDDLE OF CHAINING ARRAY METHODS, JUST USE MAP OVER IT, console.log, and return it.

const dogs =['Konrad', 'Hugo', 'Sunny', 'Scout'];

const debug = item => console.log(item) || item; // console.log() return undefined, it will just pass the entire array

dogs
  .map(dog => dog.toLowerCase())
  .filter(dog => dog.startsWith('s'))
  .map(debug)
  .map(dog => `${dog} is a dog.`) // ?


// MORE INFO: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators

/**
 * DOUBLE EQUAL VS TRIPLE EQUAL
 * ==    : allows coercion, use where it's more helpful
 * ===   : disallows coercion, use where it's safe
 *
 * If the types compared are the same, they are identical. That is to say they use the exact same algorithm.
 * If the types are different, then performance is irrelevant. Either you need type coercion, or you don't.
 * If you don't need it, don't use == because the result you get may be unexpected.
 */

// MORE INFO: https://www.ecma-international.org/ecma-262/8.0/#sec-abstract-equality-comparison