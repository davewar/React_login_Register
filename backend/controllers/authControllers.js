const User = require("../models/User");
require('dotenv').config();
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    
    Object.values(err.errors).forEach(({ properties }) => {
   
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

//create token - 5mins
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "300s"
  });
};

module.exports.signup_post = async (req, res) => {
  const { name ,email, password } = req.body;

  try {

    const user = await User.create({ name, email, password });
    const token = createToken(user._id);
    console.log(token);
   
    res
    .header('x-auth-token',token)
    .status(201).send({ token, user: { id: user._id, name } });
  }
  catch(err) {
    console.log("DWERR",err);
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}


module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);

  try {
    const user = await User.login(email, password);

    let name= user.name
    const token = createToken(user._id);

    

    res
    .header('x-auth-token',token)
    .status(201).send({ token, user: { id: user._id, name } });
    // res.status(200).json({ user: user._id });
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
  

  module.exports.protected_get = async (req, res) => {
     res.json({message:req.user})

  }



}