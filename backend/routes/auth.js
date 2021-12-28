const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'VinayIsAGoodBoy';

// Create a user using: POST "/api/auth/createuser". No login require
router.post('/createuser', [
   // Create an array for error displaying style
   body('name', 'Enter a valid name').isLength({ min: 3 }),
   body('email', 'Enter a valid email').isEmail(),
   body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
   // If there are errors, return bad request and the errors
   const errors = validationResult(req);
   // Create a validation for error display
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   // Create user help of promise & send data into mongodb
   // Check whether the user with this email exists already
   try {
      let user = await User.findOne({ email: req.body.email });
      // If find user then return bad request
      if (user) {
         return res.status(400).json({ error: "Sorry! a user with this email  already exists" })
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      user = await User.create({
         name: req.body.name,
         email: req.body.email,
         password: secPass,
      })

      const data = {
         user: {
            id: user.id
         }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      // res.json(user);
      res.json({authToken});
   } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured!");
   }
})

module.exports = router;