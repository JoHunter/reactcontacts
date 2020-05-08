import React, {  useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {

  const contactContext = useContext(ContactContext); //useContext is a hook
  const { filterContacts, clearFilter, filtered } = contactContext;
  const text = useRef(''); //refhook this is the ref a dom obj to see what the value is

  //Same as component did mount
  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = e => {
    if(text.current.value !== '')
    {//check the text value 
      filterContacts(e.target.value); //this is the state and no itellisence so beaware.
    }
    else {
      clearFilter();
    }
  }
  return (
    <form>
      <input ref={text} type="text" placeholder="filter Contacts..." onChange={onChange}></input>
    </form>
  )
}

export default ContactFilter
