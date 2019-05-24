import React, { Fragment, useState, useEffect } from 'react';

// Using firestore database for useEffect test
import { db } from '../../config/firebaseConfig';

const todo = () => {
  // INFO: https://blog.linguinecode.com/post/when-to-use-useref-and-uselayouteffect
  // INFO: Hooks Rules - You must only use useState and all other hooks at top level of component function body
  // useState Hook: [state, fn() to update state] = useState('')
  // useState hook is the class setState for function-based components

  // Handling states w/ separate hooks are better
  const [todoName, setTodoName] = useState('');
  const [todoList, setTodoList] = useState([]);

  // handle Multiple state in one hook might be prone to syntax error and verbosity
  // const [todoState, setTodoState] = useState({ userInput: '', todoList: [] });

  // Explanation about useEffect is on Part 3
  useEffect(() => {
    // -- effect main code start --
    db.collection('todoList')
      .get()
      .then(querySnapshot => {
        console.log('Main Code Starts!');
        console.log(querySnapshot);
        const fetchData = [];
        querySnapshot.forEach(doc => fetchData.push({ id: doc.id, ...doc.data() }));
        setTodoList(fetchData);
      });
    // -- effect main code end --

    // Returning function here for cleanup work (UnMounting) The clean-up function runs before the component is removed from the UI to prevent memory leaks. Additionally, if a component renders multiple times (as they typically do), the previous effect is cleaned up before executing the next effect. It runs BEFORE the main useEffect function runs, but AFTER the (first) render cycle.
    // means react will actually execute this as a cleanup before it applies the effect of the main code again
    // useEffect -> render -> cleanUp -> useEffect -> render
    return () => {
      console.log('Cleaning Up!');
    };

    // Second argument indicates how & when will useEffect should run, if array have a value to watch or none atm
    // if we insert values in that array, every time a value change useEffect gets executed like componentDidUpdate,
    // We want to run useEffect once like componentDidMount, So we pass empty array it will run at first cause its default
    // and react won't watch for any changes cause you didn't give it a reason when & how useEffect will get executed again
    // if we omit 2nd argument, it will run every time component re-renders
  }, [todoName]);

  const mouseMoveHandler = event => {
    console.log(event.clientX, event.clientY);
  };

  useEffect(() => {
    document.addEventListener('mousemove', mouseMoveHandler);
    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
    };
  }, []);

  // Handle Input Change
  const inputChangeHandler = event => {
    // setTodoState({ userInput: event.target.value, todoList: todoState.todoList });
    setTodoName(event.target.value);
  };

  // Handle Submit
  const todoAddHandler = () => {
    // setTodoState({ ...todoState, todoList: [...todoState.todoList, todoState.userInput] });
    setTodoList([...todoList, todoName]);
    setTodoName('');
    db.collection('todoList')
      .add({ todo: todoName })
      .then(docRef => console.log('Document written with ID: ', docRef.id))
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
