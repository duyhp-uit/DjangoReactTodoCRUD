import React, { Component } from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm'
import TodoCreate from './TodoCreate';

class Dashboard extends Component {
	render() {
		return (
			<div className='ui container'>
				<div>Todo 123 Form</div>
				<TodoCreate></TodoCreate>
				<TodoList />
			</div>
		);
	}
}

export default Dashboard;