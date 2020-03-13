import axios from 'axios';
import { GET_TODOS, GET_TODO, ADD_TODO, DELETE_TODO, EDIT_TODO } from './types';
import {reset} from 'redux-form'
import history from '../history'
// GET TODOS
export const getTodos = () => async dispatch => {
  const res = await axios.get('/api/todos/');
  dispatch({
    type: GET_TODOS,
    payload: res.data
  });
};

export const addTodo = formValues => async dispatch => {
  const res = await axios.post('/api/todos/', {...formValues});
  dispatch({
    type: ADD_TODO,
    payload: res.data
  });
  dispatch(reset('todoForm'));
}

export const getTodo = id => async dispatch => {
  const res = await axios.get(`/api/todos/${id}/`);
  dispatch({
    type: GET_TODO,
    payload: res.data
  })
}
export const deleteTodo = id => async dispatch =>  {
  await axios.delete(`/api/todos/${id}/`);
  dispatch({
    type: DELETE_TODO,
    payload: id
  })
  history.push('/')
}

export const editTodo = (id, formValues) => async dispatch => {
    const res = axios.patch(`/api/todos/${id}/`, {...formValues});
    dispatch({
      type: EDIT_TODO,
      payload: res.data
    });
    history.push('/');
}