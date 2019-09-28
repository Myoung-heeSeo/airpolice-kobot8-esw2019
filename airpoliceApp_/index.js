import React from 'react';
import {render} from 'react-dom';

import App from './App';
import * as firebase from 'firebase';

//original_code : https://github.com/Baekwoo-s/EnactSample
{/* <script type="text/javascript" src="webOSjs-0.1.0/webOS.js"></script> */}

const appElement = (<App />);

const originalConsoleError = console.error;

import 'bootstrap/dist/css/bootstrap.min.css';

console.error = (...args) => {
	return args[0].includes('React does not recognize the `staticContext` prop on a DOM element.') || args[0].includes('Unknown props `match`, `location`, `history`, `staticContext`') || args[0].includes('Warning: Hash history cannot PUSH the same path') ? null : originalConsoleError(args.join(' '));
};

const config = {
    apiKey: "AIzaSyDD3MkGTwwXMTI0BZMXbpdfWGK3rd9Ppus",
    authDomain: "airpolice-123de.firebaseapp.com",
    databaseURL: "https://airpolice-123de.firebaseio.com",
    storageBucket: "airpolice-123de.appspot.com"
  };

firebase.initializeApp(config);

// In a browser environment, render instead of exporting
if (typeof window !== 'undefined') {
	render(appElement, document.getElementById('root'));
}

export default appElement;
