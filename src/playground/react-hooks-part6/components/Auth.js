import React, { useContext } from 'react';

import AuthContext from '../auth-context';

const auth = props => {
  const authC = useContext(AuthContext);

  return (
    <button type="button" onClick={authC.login}>
      Login in!
    </button>
  );
};

export default auth;
