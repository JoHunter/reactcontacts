const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

// ...rest of the initial code omitted for simplicity.
const { check, validationResult } = require('express-validator/check');
const User = require('../models/User');

//@route  GET api/auth
//@desc   Get logged in user
//@access Private 
router.get('/', auth, async (req, res) => {
  //res.send('Get logged in user');
  console.log("Get");
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user); //user without password returned from Mongoose.
    console.log("User");
  } catch (err) {
    console.log("Error");
    res.status(500).send('Server Error');
  }
});

//@route  POST api/auth
//@desc   Auth user & get token
//@access Public
router.post('/',
  [
    check('email', 'Please provide a vailid email').isEmail(),
    check('password', 'Password should be longer than 6 char').isLength({ min: 6 })
  ],
  async (req, res) => {
    //res.send(req.body);//'Register a user'
    /**checks doesn't do anything. this does */
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }); }

    const { email, password } = req.body;

    try {
      //Mongoose have a few main phrases like findOne and in ES6 duplication of name and values let us use 1
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res.status(400).json({ msg: 'Invalid Credentials' });

      const payload = {
        user: {
          id: user.id
        }
      };
      //my callback
      jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: 3600000
      }, (err, token) => {
        if (err)
          throw err;
        res.json({ token });
      });

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

  module.exports = router;