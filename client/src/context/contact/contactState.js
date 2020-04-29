import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';

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
    ]
  };

  const [state, dispatch] = useReducer(ContactReducer, initalState);
  //Add Contact 

  //Delete Contact

  //Set Current Contact

  //Clear Current Contact

  //Update Contact 

  //Filter Contacts

  //Clear Filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts
      }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
