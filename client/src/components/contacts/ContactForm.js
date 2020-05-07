import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {

  const contactContext = useContext(ContactContext); //useContext is a hook

  const { addContact, current, clearCurrent , updateContact} = contactContext;

  //Same as component did mount
  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      });
    }

  }, [contactContext, current]);
  //These two values are added and they are conditional operators that the data will only respond on these two paramaters.


  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });

  const { name, email, phone, type } = contact;

  const onChange = e => setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
   
    if (current === null) {
      addContact(contact); //contactState // placeholder
    }
    else {
      updateContact(contact);
      /*setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      });*/
      clearAll();
      //this is the update that needs to take place to goto state and do it
    }
  };

  const clearAll = () => {
    clearCurrent();
  }

  return (
    <form onSubmit={onSubmit}>
      <h2 className="tex-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
      <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} />
      <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} />
      <input type="text" placeholder="Phone" name="phone" value={phone} onChange={onChange} />
      <h5>Contact type</h5>
      <input type="radio" name="type" value="personal" onChange={onChange} checked={type === 'personal'} />
      Personal{' '}
      <input type="radio" name="type" value="professional" onChange={onChange} checked={type === 'professional'} />
      Professional{' '}

      <div>
        <input type="submit" value={current ? 'Update Contact' : 'Add Contact'} className="btn btn-primary btn-block" />
      </div>
      {current && (<div>
        <button className="btn-light btn-block" onClick={clearAll}>Clear</button>
      </div>
      )}
    </form>
  )
}

export default ContactForm;
