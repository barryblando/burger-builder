import React from 'react';

import Classes from './Style.module.scss';

const overlay = ({ btnToggle }) => (
  <div className={Classes.OverlayContainer}>
    <div className={Classes.Overlay}>
      <div className={[Classes.OverlayPanel, Classes.OverlayLeft].join(' ')}>
        <h1>Welcome Back!</h1>
        <p>To keep connected with us please login with your personal info</p>
        <button className="ghost" id="signIn" type="button" onClick={btnToggle}>
          Sign In
        </button>
      </div>
      <div className={[Classes.OverlayPanel, Classes.OverlayRight].join(' ')}>
        <h1>Hello, Friend!</h1>
        <p>Enter your personal details and start journey with us</p>
        <button className="ghost" id="signUp" type="button" onClick={btnToggle}>
          Sign Up
        </button>
      </div>
    </div>
  </div>
);

export default overlay;
