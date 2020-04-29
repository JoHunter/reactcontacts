import React from 'react'
//import ContactContext from '../../context/contact/contactContext';
import PropTypes from 'prop-types';

const ContactItem = ({ contact }) => {

  const { id, name, email, phone, type } = contact;
  
  return (
    <div className='card bg-ligt'>
      <h3 className="text-primary text-left">
        {name}{' '} <span style={{ float: 'right' }} className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
      </h3>
      <ul>
        <li className="list">
          {email && (
            <li>
              <i className="fas fa-envelope-open"></i>{email}
            </li>)}
            {phone && (
            <li>
              <i className="fas fa-phone"></i>{phone}
            </li>)}
            
        </li>
      </ul>
      <button className="btn btn-dark sm">Save</button>
      <button className="btn btn-danger sm">Delete</button>

    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactItem;