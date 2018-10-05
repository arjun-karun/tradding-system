import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AddMatch from './bet/AddMatch';
import registerServiceWorker from './registerServiceWorker';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

ReactDOM.render(
	<Router>
	 	<Switch>
	    	<Route exact path="/" component={App}></Route>
	    	<Route path="/addmatch" component={AddMatch}></Route>
    	</Switch>
	</Router>, document.getElementById('root'));
registerServiceWorker();
