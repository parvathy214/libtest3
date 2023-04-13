const express = require ('express');
const SignupData = require("../model/signup")
var router = express.Router();
const bcrypt = require('bcryptjs');

router.post('/signin', async (req, res) => {
  try {
    // Extract the username, password and email from the request body
    const { username, password, email } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object with the hashed password
    const user = new SignupData({
      username: username,
      password: hashedPassword,
      email: email
    });

    // Save the user to the database
    await user.save();

    // Send a success response to the client
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    // Send an error response to the client
    res.status(500).json({ message: 'Failed to create user' });
  }
});


// Endpoint to handle user login
const jwt = require('jsonwebtoken')
router.post('/login', async (req, res) => {
  try {
    // Extract the email and password from the request body
    const { email, password } = req.body;

    // Find the user with the matching email in the database
    const user = await SignupData.findOne({ email });

    if (user) {
      // Compare the password with the hashed password in the database using bcrypt
      const passwordMatches = await bcrypt.compare(password, user.password);

      if (passwordMatches) {
        // If the password matches, send a success response to the client
        let payload ={email:email,password:password}
        let token = jwt.sign(payload,'ilikeapples13')
                console.log(token)

        res.json({ message: 'Login successful',status:true,token:token });

      } else {
        // If the password does not match, send an error response to the client
        res.json({ message: 'Invalid credentials',status:false });
        
      }
    } else {
      // If no user is found with the provided email, send an error response to the client
      res.json({ message: 'Invalid credentials',status:false});
      
    }
  } catch (error) {
    // Send an error response to the client
    res.status(500).json({ message: 'Failed to login',status:false });
  }
});





module.exports = router;