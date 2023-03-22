import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';


// we want the DOM to render the imported App component!
// the 2nd argument is gonna trigger our div with an id of 'root', and is gonna inject our entire App component (entire React application)
ReactDOM.render(<App />, document.getElementById('root'));