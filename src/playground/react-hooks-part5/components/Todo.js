/* eslint-disable no-console */
import React, { Fragment, useState, useEffect, useReducer, useRef, useMemo } from 'react';

// Using firestore as NoSQL database
import { db } from '../../../config/firebaseConfig';

import List from './List';

const todo = () => {
  const [inputIsValid, setInputIsValid] = useState(false);
  // using internal reference for onChange handler
  const todoInputEl = useRef();

  // just like redux we have to include state and action
  const todoListReducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        return [...state, action.payload];
      case 'SET':
        return action.payload;
      case 'REMOVE':
        return state.filter(td => td.id !== action.payload);
      default:
        return state;
    }
  };

  // use useReducer for intermediate state handling, use useState for simple state (i.e input handling) or maybe use useRef for that
  // useReducer accepts 3 arguments:
  // (1) reducer function
  // (2) initial state
  // (3) initial action - optional
  const [todoList, dispatch] = useReducer(todoListReducer, []);

  useEffect(() => {
    // -- effect main code start --
    todoInputEl.current.focus();
    db.collection('todoList')
      .get()
      .then(querySnapshot => {
        console.log('[UseEffect 1: DidMount] Main Code Starts!');
        const fetchData = [];
        querySnapshot.forEach(doc => fetchData.push({ id: doc.id, ...doc.data() }));
        dispatch({ type: 'SET', payload: fetchData });
      });
    // -- effect main code end --

    // useEffect -> render -> cleanUp -> useEffect -> render
    return () => {
      console.log('[UseEffect 1: DidUnMount] Clean Up!');
    };

    // if we omit 2nd argument, it will run every time
  }, []);

  const inputValidationHandler = e => {
    if (e.target.value.trim() === '') {
      setInputIsValid(false);
    } else {
      setInputIsValid(true);
    }
  };

  const todoAddHandler = e => {
    e.preventDefault();
    // access current html reference value
    // ref point to input where as input have value field
    const todoName = todoInputEl.current.value;

    db.collection('todoList')
      .add({ todo: todoName })
      .then(docRef => {
        const todoItem = { id: docRef.id, todo: todoName };
        dispatch({ type: 'ADD', payload: todoItem });
      })
      .catch(error => console.error('Error adding document: ', error));

    todoInputEl.current.value = '';
  };

  const todoRemoveHandler = todoId => {
    db.collection('todoList')
      .doc(todoId)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');
        dispatch({ type: 'REMOVE', payload: todoId });
      })
      .catch(error => console.error('Error removing document: ', error));
  };

  return (
    <Fragment>
      <form onSubmit={todoAddHandler}>
        <input
          type="text"
          ref={todoInputEl}
          onChange={inputValidationHandler}
          style={{ backgroundColor: inputIsValid ? 'transparent' : 'red' }}
        />
        <button type="submit">Add</button>
      </form>
      {/*
          Using useMemo to avoid unnecessary re-rendering of List when setInputIsValid is triggered
          useMemo / memoization basically about caching value (e.g if their inputs don't change (i.e todoList))
          if its value didn't change then don't recalculate & re-render, just take the old stored cached
          useMemo is the class shouldComponentUpdate for function-based components
          useMemo accepts 2 mandatory args:
            - (1) anonymous function that returns a component.
            - (2) array of values we want react to watch out for.
       */}
      {useMemo(
        () => (
          <List items={todoList} todoRemoveHandler={todoRemoveHandler} />
        ),
        [todoList]
      )}
    </Fragment>
  );
};

export default todo;
