const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const { success } = require('concurrently/src/defaults');

const JWT_SECRET = 'Vincaprin';

// ROUTE 1 : Create a user using: POST "/api/auth/createuser". No login require
router.post('/createuser', [
   // Create an array for error displaying style
   body('name', 'Enter a valid name').isLength({ min: 3 }),
   body('email', 'Enter a valid email').isEmail(),
   body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
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

      // Create a salt for secure the password help of bcrypt.js
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      user = await User.create({
         name: req.body.name,
         email: req.body.email,
         password: secPass,
      })

      // Display a payload from the internal server
      const data = {
         user: {
            id: user.id
         }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      // res.json(user);
      res.json({ authToken });
   } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error!");
   }
})





// ROUTE 2 : Authenticate a user using: POST "/api/auth/login". No login require
router.post('/login', [
   body('email', 'Enter a valid email').isEmail(),
   body('password', 'Password cannot be blank').exists()
], async (req, res) => {
   let success = false;
   // If there are errors, return bad request and the errors
   const errors = validationResult(req);
   // Create a validation for error display
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   // Create a destructure of an array with email & password for fetch the credentials from db
   const { email, password } = req.body;
   try {
      // Match the insert email from db
      let user = await User.findOne({ email });
      if (!user) {
         success = false;
         return res.status(400).json({ success, error: "Please try to login with correct credentials" });
      }

      // Compare the both password from db and user insert
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
         success = false;
         return res.status(400).json({ success, error: "Please try to login with correct credentials" });
      }

      // Send a payload from the internal server
      const data = {
         user: {
            id: user.id
         }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      // res.json(user);
      res.json({ success, authToken });
   } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error!");
   }

})





// ROUTE 3 : Get logged in user details using: POST "/api/auth/getuser". Login required
// middleware : function for request-response cycle to user
router.post('/getuser', fetchuser, async (req, res) => {
   try {
      userId = req.user.id;
      // Select all data except password
      const user = await User.findById(userId).select("-password");
      res.send(user);
   } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error!");
   }
})

module.exports = router;