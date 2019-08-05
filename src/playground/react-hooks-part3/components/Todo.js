import React, { Fragment, useState, useEffect } from 'react';

// Using firestore database for useEffect test
import { db } from '../../../config/firebaseConfig';

const todo = () => {
  // INFO: Hooks Rules - You must only use useState and all other hooks at top level of component function body
  // useState Hook: [state, fn() to update state] = useState('')

  // Handling states w/ separate hooks are better
  const [todoName, setTodoName] = useState('');
  const [todoList, setTodoList] = useState([]);

  // handle Multiple state in one hook might be prone to syntax error and verbosity
  // const [todoState, setTodoState] = useState({ userInput: '', todoList: [] });

  // Executes after render cycle, we're causing side-effect here using useEffect Hook and btw you can implement multiple useEffects
  // Using useEffect hook is like having both componentDidMount and componentDidUpdate in one single method.
  // Since useEffect runs on every render. It accepts two arguments:
  // (mandatory) A function to run on every render
  // (optional) An array of state variables to watch for changes. useEffect will be skipped if none of the variables are updated.
  // useEffect(() => { return () => {} }, Optional[input, etc])
  useEffect(() => {
    // -- effect main code start --
    db.collection('todoList')
      .get()
      .then(querySnapshot => {
        console.log('[UseEffect 1: DidMount] Main Code Starts!');
        const fetchData = [];
        querySnapshot.forEach(doc => fetchData.push({ id: doc.id, ...doc.data() }));
        setTodoList(fetchData);
      });
    // -- effect main code end --

    // You might have some code that need to run when the component will be removed from the DOM tree.
    // In useEffect hook, you can specify a componentWillUnmount method by returning a function.
    // Since componentWillUnmount is used for cleaning whatever left behind by your component.
    // It runs BEFORE the main useEffect function runs, but AFTER the (first) render cycle
    // means react will actually execute this as a cleanup before it applies the effect of the main code again
    // useEffect -> render -!> cleanUp -> useEffect -> render
    return () => {
      console.log('[UseEffect 1: DidUnMount] Clean Up!');
    };

    // Second argument indicates how & when will useEffect should run, if array have a value to watch or none atm
    // if we insert values in that array, every time a value change useEffect gets executed like componentDidUpdate,
    // We want to run useEffect once like componentDidMount, So we pass empty array it will run at first cause its default
    // and react won't watch for any changes cause you didn't give it a reason when & how useEffect will get executed again
    // if we omit 2nd argument, it will run every time component re-renders
  }, [todoName]);

  // const mouseMoveHandler = event => {
  //   console.log(event.clientX, event.clientY);
  // };

  // useEffect(() => {
  //   console.log('[UseEffect 2] mousemove Added!');
  //   document.addEventListener('mousemove', mouseMoveHandler);
  //   return () => {
  //     console.log('[UseEffect 2] mousemove Removed!');
  //     document.removeEventListener('mousemove', mouseMoveHandler);
  //   };
  // }, []);

  // Handle Input Change
  const inputChangeHandler = event => {
    // setTodoState({ userInput: event.target.value, todoList: todoState.todoList });
    setTodoName(event.target.value);
  };

  // Handle Submit
  const todoAddHandler = () => {
    // setTodoState({ ...todoState, todoList: [...todoState.todoList, todoState.userInput] });
    // setTodoName('');
    db.collection('todoList')
      .add({ todo: todoName })
      .then(docRef => {
        const todoItem = { id: docRef.id, todo: todoName };
        setTodoList([...todoList, todoItem]);
      })
      // eslint-disable-next-line no-console
      .catch(error => console.error('Error adding document: ', error));
  };

  return (
    <Fragment>
      <input type="text" onChange={inputChangeHandler} value={todoName} />
      <button type="button" onClick={todoAddHandler}>
        Add
      </button>
      <ul>{todoList && todoList.map(({ id, todo: td }) => <li key={id}>{td}</li>)}</ul>
    </Fragment>
  );
};

export default todo;
