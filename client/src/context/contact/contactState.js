import React, { useReducer } from 'react';
//import uuid from 'uuid';
import { v4 as uuidv4 } from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

const ContactState = props => {
  const initalState = {
    contacts: [
      {
        id: 1,
        name: 'Jill Johnson',
        email: 'jill@gmail.com',
        phone: '111-111-1111',
        type: 'personal'
      },
      {
        id: 2,
        name: 'Jack Johnson',
        email: 'jack@gmail.com',
        phone: '211-111-1111',
        type: 'personal'
      },
      {
        id: 3,
        name: 'Judy Johnson',
        email: 'judy@gmail.com',
        phone: '311-111-1111',
        type: 'professional'
      }
    ],
    current: null
  };

  const [state, dispatch] = useReducer(contactReducer, initalState);

  //Add Contact  use uuid because we don't have mongo setup for adding ///Goto Reducer
  const addContact = contact => {
    contact.id = uuidv4();
    console.log(contact.id);
    dispatch({ type: ADD_CONTACT, payload: contact });
     //Now add it to the bottom here in Context
  };

  //Delete Contact
  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id });
     //Now add it to the bottom here in Context
     //console.log("deleted " + id)
  };

  //Set Current Contact
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  //Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT }); //This means if we don't send payload. we are just setting it to null
  }

  //Update Contact 
  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };


  //Filter Contacts

  //Clear Filter

  //Return Provider

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;