import React, { useContext } from 'react'
import ContactContext from '../../context/contact/contactContext';
import PropTypes from 'prop-types';

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext); //useContext is a hook

  const { deleteContact } = contactContext;

  const { id, name, email, phone, type } = contact;

  const onDelete = e => deleteContact(id);
  

  return (
    <div className='card bg-ligt'>
      <h3 className="text-primary text-left">
        {name}{' '} <span style={{ float: 'right' }} className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
      </h3>
      <ul>
        <li className="list">
          {email && (
            <li>
              <i className="fas fa-envelope-open"></i>&nbsp;&nbsp;{email}
            </li>)}
          {phone && (
            <li>
              <i className="fas fa-phone"></i>&nbsp;{phone}
            </li>)}

        </li>
      </ul>
      <button className="btn btn-dark sm">Save</button>
      <button className="btn btn-danger sm" onClick={onDelete}>Delete</button>

    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactItem;