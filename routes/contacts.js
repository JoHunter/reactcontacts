const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
// ...rest of the initial code omitted for simplicity.
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');
const Contact = require('../models/Contact');


//@route  GET api/contacts
//@desc   Get all a user contacts
//@access Private 
router.get('/', auth, async (req, res) => {
  //res.send('Get all contacts');
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }


});

//@route  POST api/contacts
//@desc   Add new contact
//@access Private 
router.post('/', [auth, [check('name', 'name is required').not().isEmpty()]], async (req, res) => {
  //res.send('Add new contact');
  //check the validation errors here
  const errors = validationResult(req);
  if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }); }

  const { name, email, phone, type } = req.body;

  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      type,
      user: req.user.id
    });

    const contact = await newContact.save();

    res.json(contact);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server contact error');
  }

});

//@route  POST api/contacts/:id
//@desc   Update contact
//@access Private 
router.put('/:id', auth, async (req, res) => {
  //res.send('Update contact');
  const { name, email, phone, type } = req.body;
  //Build contact obj
  const contactfields = {};
  if(name) contactfields.name = name;
  if(email) contactfields.email = email;
  if(phone) contactfields.phone = phone;
  if(type) contactfields.type = type; 

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    //make sure user owns user
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactfields },
      { new: true }
      );

    res.json(contact);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Put error');
  }
});

//@route  DELETE api/contacts/:id
//@desc   Delete contact
//@access Private 
router.delete('/:id', auth, async (req, res) => {
  ///res.send('Delete contact');

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    //make sure user owns user
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Contact removed'});

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Put error');
  }

});

module.exports = router;