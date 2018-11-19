import React, { useState } from 'react';

import classes from './App.module.scss';

function Todo({ todo, index, completeTodo, removeTodo }) {
  const style = [classes.todo];

  if(todo.isCompleted) {
    style.push(classes.isCompleted)
  }

  return (
    <div className={style.join(' ')}>
      {todo.text}
      <div className={classes.todo__buttons}>
        <button className={classes.button} onClick={() => completeTodo(index)}>Complete</button>
        <button className={classes.button} onClick={() => removeTodo(index)}>X</button>
      </div>
    </div>
  )
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if(!value) return;
    addTodo(value);
    setValue('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className={classes.input}
        value={value}
        placeholder="Add Todo..."
        onChange={e => setValue(e.target.value)}
      />
    </form>
  )
}

function App() {
  // state, function to update the state
  const [todoLists, setTodoLists] = useState([
    {
      text: 'Learn about react',
      isCompleted: false,
    },
    {
      text: 'Meet friend for lunch',
      isCompleted: false,
    },
    {
      text: 'Build  really cool todo app',
      isCompleted: false,
    },
  ]);

  const addTodo = text => {
    const newTodoList = [...todoLists, { text }];
    setTodoLists(newTodoList);
  };

  const completeTodo = index => {
    const newTodoList = [...todoLists];
    newTodoList[index].isCompleted = true;
    setTodoLists(newTodoList);
  };

  const removeTodo = index => {
    const newTodoList = [...todoLists].filter((_, i) => i !== index);
    setTodoLists(newTodoList);
  };

  return (
    <div className={classes.app}>
      <div className={classes.container}>
        <div className={classes.todo__list}>
          {todoLists.map((todo, index) => (
            <Todo
              key={index}
              index={index}
              todo={todo}
              completeTodo={completeTodo}
              removeTodo={removeTodo} />
          ))}
          <TodoForm addTodo={addTodo} />
        </div>
      </div>
    </div>
  )
}

export default App;