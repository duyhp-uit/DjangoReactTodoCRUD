// frontend/src/components/App.js
import React, { Component, useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './todos/Dashboard'; // added
import { Route, Router, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'; // added
import store from '../store'; // added
import Header from './layout/Header';
import history from '../history'
import TodoDelete from './todos/TodoDelete'
import TodoEdit from './todos/TodoEdit';
import "../css/App.scss"
import axios from 'axios';

// class App extends Component {
// 	render() {
// 	return (
// 		//adfaf
// 		<Provider store={store}>
// 			<Router history = {history}>
// 			<Header></Header>
// 			<Switch>
// 				<Route exact path='/' component={Dashboard}></Route>
// 				<Route exact path='/delete/:id' component={TodoDelete}></Route>
// 				<Route exact path='/edit/:id' component={TodoEdit}></Route>
// 			</Switch>
// 			</Router>
// 		</Provider>
// 	);
// 	}
// }

function Todo({todo, index, completeTodo, removeTodo}) {
	return(
		<div
			className="todo"
			style={{textDecoration:todo.isCompleted ? "line-through": ""}}
		>
		<div style= {{marginRight: 15}}>{index}</div>
		{todo.text}
		<button onClick={() => completeTodo(todo, index)}>Completed</button>
		<button onClick={() => removeTodo(index, todo)}>Remove</button>
		</div>

	)
}

function TodoForm({ addTodo }) {
	const [value, setValue] = useState("");
	const handleSubmit = e => {
	  e.preventDefault();
	  if (!value) return;
	  addTodo(value);
	  setValue("");
	};
  
	return (
	  <form onSubmit={handleSubmit}>
		<input
		  type="text"
		  className="input"
		  value={value}
		  onChange={e => setValue(e.target.value)}
		/>
	  </form>
	);
  }
  

function App() {
	
	const [todos, setTodos] = useState([]);
	useEffect(() => {
		fetchData();
  	}, [])
	async function fetchData() {
		await fetch("api/todos/").then(res => res.json()).then(json => setTodos(json));
	  }
	async function postData(text) {
		await fetch("api/todos/", {
			method: 'POST',
			headers: {'Content-Type':'application/json'},
			body: '{"text": "' + text + '"}'
		}).then(() => fetchData());
	  }
	async function deleteData(todo) {
		const res = await fetch("api/todos/" + todo.id + "/", {
			method: 'DELETE'
		})
	  }

	async function completeData(todo) {
	const res = await fetch("api/todos/" + todo.id + "/", {
		method: 'PUT',
		headers: {'Content-Type':'application/json'},
		body: '{"isCompleted": "' + !todo.isCompleted + '", "text": "'+ todo.text + '"}'
	});
	}
	
	const addTodo = (text)=> {
		postData(text);
	}

	const completeTodo = (todo, index) => {
		const newTodos = [...todos];
		completeData(todo)
		newTodos[index].isCompleted = !newTodos[index].isCompleted;
		setTodos(newTodos);
	}
	const removeTodo = (index, todo) => {
		const newTodos = [...todos];
		console.log(newTodos);

		newTodos.splice(index, 1);
		deleteData(todo);
		setTodos(newTodos);
	}
	return (
		<div className="app">
		<div className="todo-list">
			{ todos.map((todo, index) => (
				<Todo
					key={index}
					index={index}
					todo={todo}
					completeTodo={completeTodo}
					removeTodo={removeTodo}			
				>
				</Todo>
			))
			}
			<TodoForm addTodo={addTodo}	
			 />
		</div>
		</div>
	)
}

ReactDOM.render(<App />, document.querySelector('#app'));