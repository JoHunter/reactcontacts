import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CONTACT,
  CLEAR_CONTACT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  SET_ALERT,
  REMOVE_ALERT
} from '../types';

export default (state, action) => {
  switch (action.type) /*because action have type and payload*/ {
    default:
      return state;
  }
}