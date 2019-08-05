import React from 'react';

import Classes from './Style.module.scss';

import SocialLinks from './Social';

const signIn = () => {
  const inputClasses = [Classes.FormContainer, Classes.SignInContainer];

  return (
    <div className={inputClasses.join(' ')}>
      <form action="#">
        <h1>Sign In</h1>
        <SocialLinks />
        <span>or use your your account</span>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <a href="#">Forgot your password?</a>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default signIn;
