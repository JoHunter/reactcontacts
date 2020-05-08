import React, { Fragment, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';

const Contacts = () => {
  const contactContext = useContext(ContactContext); //useContext is a hook

  //destructure
  const { contacts, filtered } = contactContext;
//<h3>{contact.name}</h3>)

  if(contacts.length === 0)
  {
    return <h4>Please add a contact</h4>
  }

  /**  {contacts.map(contact => <ContactItem key={contact.id}  contact={contact} />)}  move the key to CSSTransition*/
  return (
    <div>
      <Fragment>
        <TransitionGroup>
        {filtered !== null ? filtered.map(contact => (     
          <CSSTransition key={contact.id} timeout={1000} classNames="item"> 
           <ContactItem  contact={contact} />
          </CSSTransition>  
        )) : (contacts.map(contact => 
          <CSSTransition key={contact.id} timeout={1000} classNames="item"> 
            <ContactItem   contact={contact} />
          </CSSTransition>  
        ))}
        </TransitionGroup>      
      </Fragment>
    </div>
  );
};

export default Contacts;

