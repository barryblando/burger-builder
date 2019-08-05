import React, { useState } from 'react';

import './index.css';

import Classes from './Style.module.scss';

import SignUp from './SignUp';
import SignIn from './SignIn';
import Overlay from './Overlay';

const app = () => {
  const [toggle, setToggle] = useState(false);

  const inputClasses = [Classes.Container];

  // if toggle is true
  if (toggle) {
    inputClasses.push(Classes.RightPanelActive);
  }

  return (
    <div className={inputClasses.join(' ')}>
      <SignUp />
      <SignIn />
      <Overlay btnToggle={() => setToggle(!toggle)} />
    </div>
  );
};

export default app;
