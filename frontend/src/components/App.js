// frontend/src/components/App.js
import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './todos/Dashboard'; // added
import { Route, Router, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'; // added
import store from '../store'; // added
import Header from './layout/Header';
import history from '../history'
import TodoDelete from './todos/TodoDelete'
import TodoEdit from './todos/TodoEdit';
class App extends Component {
	render() {
	return (
		//adfaf
		<Provider store={store}>
			<Router history = {history}>
			<Header></Header>
			<Switch>
				<Route exact path='/' component={Dashboard}></Route>
				<Route exact path='/delete/:id' component={TodoDelete}></Route>
				<Route exact path='/edit/:id' component={TodoEdit}></Route>
			</Switch>
			</Router>
		</Provider>
	);
	}
}

ReactDOM.render(<App />, document.querySelector('#app'));