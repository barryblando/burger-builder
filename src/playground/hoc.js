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

// Part of FunctionalProgramming101
// FUNCTIONs are first class citizens in javascript, why? take a look at this

// 1. Can be pass as an argument
function createSafeVersion(func) {
  /** CLOSURE & CURRYING - Works with Function **/
  // 2. Can be return by a function
  return function(n, message) {
    if (n !== null && typeof n === 'number') {
      if (message !== null && typeof message === 'string') {
        return func(n, message); // <== (Lexical!, Closure is when a function "remembers" its lexical scope even when the function is executed outside that lexical scope)
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
