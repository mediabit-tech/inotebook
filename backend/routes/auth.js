const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Create a user using: POST "/api/auth/". No login require
router.post('/', [
   // Create an array for error displaying style
   body('name', 'Enter a valid name').isLength({ min: 3 }),
   body('email', 'Enter a valid email').isEmail(),
   body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], (req, res) => {
   const errors = validationResult(req);
   // Create a validation for error display
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   // Create user help of promise & send data into mongodb
   User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
   }).then(user => res.json(user))
   .catch(err=>{console.log(err)
      res.json ({error: 'Please enter a unique value for email'})})
})

module.exports = router;