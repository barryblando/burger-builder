import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// import './index.css'; // remove comment after DoubleSlider has finished

import App from './App';

import * as serviceWorker from './serviceWorker';

import configureStore from './store/configureStore';

import { firebase } from './config/firebaseConfig';

import Spinner from './components/UI/Spinner/Spinner';

// Playgrounds
// import { QuizApp } from './playground/quiz-app/App';
// import UseStateUseEffect from './playground/react-hooks-part2/useState&useEffect';
// import AppHook6 from './playground/react-hooks-part6/App';
import AppDoubleSlider from './playground/DoubleSliderSignIn&Up/App';

// When you do this < /> with component name inside it means its an instance of it
const app = (
  <Provider store={configureStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

const hasRendered = false;

const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(app, document.getElementById('root'));
    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: http://bit.ly/CRA-PWA
    serviceWorker.unregister();
  }
};

// let loading render first
// ReactDOM.render(<Spinner />, document.getElementById('root'));

// Waiting for auth Ready, so when page refresh or if authenticated no more split-second nav change on App Component
// firebase.auth().onAuthStateChanged(() => renderApp());

// playground render
ReactDOM.render(<AppDoubleSlider />, document.getElementById('root'));
