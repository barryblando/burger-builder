/* eslint-disable */
// Higher Order Component (HOC) - A Component (HOC) that renders another component
// Reuse code
// Render hijacking
// Prop manipulation
// Abstract state

import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';

const Info = props => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
);
// ------------------------------------------=> Return the HOC
const withAdminWarning = WrappedComponent => {
  return props => (
    <div>
      {props.isAdmin && <p>This is info. Please dont share! </p>}
      {/* <Info {...props} /> */}
      <WrappedComponent {...props} />
    </div>
  );
};

const requireAuthentication = WrappedComponent => props => (
  <div>{props.isAuthenticated ? <WrappedComponent {...props} /> : <p>Please login to view the info</p>}</div>
);

const AuthInfo = requireAuthentication(Info);
const AdminInfo = withAdminWarning(Info);

render(<AdminInfo isAdmin={false} info="There are the details" />, document.getElementById('app'));
// render(<AuthInfo isAuthenticated info="There are the details" />, document.getElementById('app'));

// -- HOC ? let's say our WrappedComponent is EditExpensePage --
// const connect = (injectedStateProp, injectedDispatchProp) => {
//   **CLOSURE&CURRYING**
//   - we can still have access to variable StateProp & DispatchProp 'cause of scope chain & lexical env
//   return (WrappedComponent) => {
//     - props here are values injected by other Component (e.g Router that passes down match prop)
//     - return function that returns WrappedComponent w/ props to render
//     return (props) => <WrappedComponent {...injectedStateProp} {...injectedDispatchProp} {...props} />
//   };
// };
//
//   **PARTIAL APPLICATION**
// connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);

// Part of FunctionalProgramming101
// FUNCTIONs are first class citizens in javascript, why? take a look at this

// 1. Can be pass as an argument
function createSafeVersion(func) {
  /** CLOSURE & CURRYING - Works with Function **/
  // 2. Can be return by a function
  return function(n, message) { //  <== (Lexically Sits!)
    if (n !== null && typeof n === 'number') {
      if (message !== null && typeof message === 'string') {
        return func(n, message); // Closure is when a function can remember and access its lexical scope even when it's invoked outside its lexical scope., we can access lexical names which are identifiers that are used to name variables (and keywords, and functions, and labels, etc..
      }
    }
  }
  // PS Closure is logical conclusion of lexical scope, if you understand lexical scope you understand closure
}

function printMessageNTimes(n, message) {
  for (let i = 0; i < n; i++) { console.log(message) }
}

function getNthLetter(n, string) {
  return string.chartAt(n);
}

function getSubstringOfLength(n, string) {
  return string.substring(0, n);
}

// 3. Can be assign to variables
let printMessageNTimesSafe = createSafeVersion(printMessageNTimes);
let getNthLetterSafe = createSafeVersion(getNthLetter);
let getSubstringOfLengthSafe = createSafeVersion(getSubstringOfLength);

/** PARTIAL APPLICATION - Works with Data **/
printMessageNTimesSafe(4, 'Banana'); // 'Banana Banana Banana Banana'
getNthLetterSafe(2, 'Javascript'); // 'v'
getSubstringOfLengthSafe(5, 'Hello and welcome'); // 'Hello'

// *************************************************************************
// *************************************************************************

function breathe(amount) {
  return new Promise((resolve, reject) => {
    if(amount < 500) {
      reject('Ohh Noo! Too Low!')
    }
    setTimeout(() => resolve(`Done for ${amount} ms`), amount);
  });
}

function catchErrors(fn) {
  // using rest operator to gather all those together from assignment context into an array
  return function(...params) {
    // using spread operator to spread all those in value context out into individual values
    return fn(...params).catch((err) => { // go returns promise so you can always just tack on a .catch on the end
      console.error('Ohh Nooo!!!!');
      console.error(err);
    });
  }
}

async function go(name, last) {
  console.log(`Starting for ${name} ${last}!!!`);
  const res = await breathe(1000);
  console.log(res);
  const res2 = await breathe(300);
  console.log(res2);
  const res3 = await breathe(750);
  console.log(res3);
  const res4 = await breathe(900);
  console.log(res4);
}

/** CURRYING **/
const wrappedFunction = catchErrors(go);
wrappedFunction('Barry', 'Blando')