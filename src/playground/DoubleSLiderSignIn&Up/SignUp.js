import React from 'react';

import Classes from './Style.module.scss';

import SocialLinks from './Social';

const signUp = () => {
  const inputClasses = [Classes.FormContainer, Classes.SignUpContainer];

  return (
    <div className={inputClasses.join(' ')}>
      <form action="#">
        <h1>Create Account</h1>
        <SocialLinks />
        <span>or use your email for registration</span>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default signUp;
