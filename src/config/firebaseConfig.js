import firebase from 'firebase/app';
// import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import ReduxSagaFirebase from 'redux-saga-firebase';

const devConfig = {
  apiKey: 'AIzaSyCE1zoAXn_sfN2sVUvTszQtfvgsBoPlAM8',
  authDomain: 'react-burger-builder-1f376.firebaseapp.com',
  databaseURL: 'https://react-burger-builder-1f376.firebaseio.com',
  projectId: 'react-burger-builder-1f376',
  storageBucket: 'react-burger-builder-1f376.appspot.com',
  messagingSenderId: '1073730427372',
};

const prodConfig = {};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

const reduxSagaFirebase = new ReduxSagaFirebase(firebase.initializeApp(config));

// firebase.firestore().settings({ timestampsInSnapshots: true });

export { firebase, reduxSagaFirebase as default };
