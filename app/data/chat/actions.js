import {ADD_MESSAGE, ADD_USER} from './reducer';

export const addMessage = (data) => ({
  type: ADD_MESSAGE,
  data,
});

export const addUser = (data) => ({
  type: ADD_USER,
  data,
});
