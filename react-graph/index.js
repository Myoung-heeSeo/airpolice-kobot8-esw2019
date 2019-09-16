import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCdZp6Vs7OifmlyL6r4VaRg2j3VTikJx4k",
    authDomain: "semicircle-e42e6.firebaseapp.com",
    databaseURL: "https://semicircle-e42e6.firebaseio.com",
    storageBucket: "semicircle-e42e6.appspot.com"
};

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
