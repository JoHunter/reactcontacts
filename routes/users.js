const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// ...rest of the initial code omitted for simplicity.
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');



//@route  POST api/users
//@desc   Register a user
//@access Public 
///here in for the second params added array
router.post('/', [
  check('name', 'Please add name').not().isEmpty(),
  check('email', 'Please provide a vailid email').isEmail(),
  check('password', 'Password should be longer than 6 char').isLength({ min: 6 })
],
  async (req, res) => {
    //res.send(req.body);//'Register a user'
    /**checks doesn't do anything. this does */
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }); }
    //res.send('passed'); //this is the test // so at this stage we only have the body
    //destructure it

    const { name, email, password } = req.body;

    try {
      //Mongoose have a few main phrases like findOne and in ES6 duplication of name and values let us use 1
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User exists' });
      }
      //if user doesn't exist  //ES6 make name: name > name  
      user = new User({
        name,
        email,
        password
      });

      //all promises have awaits

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt); //send both psw and salt to encrypt psword
      await user.save(); //save to db

      //res.send('user saved'); I don't want to send just a response but a payload

      const payload = {
        user: {
          id: user.id
        }
      }
      //my callback
      jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: 3600000
      },(err, token) => {
        if(err)
        throw err;
        res.json({token});
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
