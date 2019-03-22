/* eslint-disable no-console */
import React, { Fragment, useEffect, useReducer, useRef } from 'react';

// Using firestore as NoSQL database
import { db } from '../../../config/firebaseConfig';

const todo = () => {
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

  // useReducer accepts 3 arguments:
  // (1) reducer function
  // (2) initial state
  // (3) initial action - optional
  const [todoList, dispatch] = useReducer(todoListReducer, []);

  useEffect(() => {
    // -- effect main code start --
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

    // if we omit 2nd argument, it will run every time component re-renders
  }, [todoInputEl]);

  const todoAddHandler = () => {
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
      <input type="text" ref={todoInputEl} />
      <button type="button" onClick={todoAddHandler}>
        Add
      </button>
      <ul>
        {todoList &&
          todoList.map(({ id, todo: td }) => (
            <li key={id} role="presentation" onClick={() => todoRemoveHandler(id)}>
              {td}
            </li>
          ))}
      </ul>
    </Fragment>
  );
};

export default todo;
