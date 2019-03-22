import React from 'react';

const list = ({ items, todoRemoveHandler }) => {
  console.log('Rendering the list!...');
  return (
    <ul>
      {items &&
        items.map(({ id, todo: td }) => (
          <li key={id} role="presentation" onClick={() => todoRemoveHandler(id)}>
            {td}
          </li>
        ))}
    </ul>
  );
};

export default list;
