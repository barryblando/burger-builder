import React, { useContext } from 'react';

import authContext from '../auth-context';

const header = ({ onLoadTodos, onLoadAuth }) => {
  const authC = useContext(authContext);

  return (
    <header>
      {authC.status && (
        <>
          <button type="button" onClick={onLoadTodos}>
            Todo List
          </button>
          |
        </>
      )}
      <button type="button" onClick={onLoadAuth}>
        Auth
      </button>
    </header>
  );
};

export default header;
