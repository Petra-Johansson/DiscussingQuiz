const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "2d" });
};
// create user logic
const createUserLogic = () => {};

/*sign in user logic
const userSignInLogic= async (email, password)=> {
 try{ 
  if(!email) {
    throw Error("You can't leave email empty")
  }
  if(!password) {
    throw Error("You need to type in a password")
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }
  
  /*
  const username = await User.findOne({ username });
  if(!username){
    throw Error("Incorrect username")
  };

    // conmparing the typed in password to the hashed, saved, password 
  const match = await bcrypt.compare(password, user.password)
  if(!match){
    throw Error("Incorrect password. Try again or reset password")
  }
  const token = createToken(user._id)
  
  return user, token
 } catch (error) {
    return error;
 }
};
*/
// get all users logic
const allUsersLogic = () => {
  try {
    const users = User.find({});

    if (!users) {
      return error;
    }
    return users;
  } catch (error) {
    return error;
  }
};

//get one user logic, byid

const getUser = async (id) => {
  try {
    const oneUser = await User.findById(id);

    if (!oneUser) {
      return error;
    }
    return oneUser;
  } catch (error) {
    return error;
  }
};

const getUserEmail = async (email) => {
  try {
    const oneUser = await User.findOne({ email });

    if(!oneUser){
      return error;
    }
    return oneUser;
  } catch (error) {
    return error;
  }
};

// update one user logic
const updateUserLogic = (id, body) => {
  try {
    const user = User.findOneAndUpdate({ _id: id }, { ...body }, { new: true });

    if (!user) {
      return error;
    }

    return user;
  } catch (error) {
    return error;
  }
};

//delete one user logic
const deleteUserLogic = (id) => {
  try {
    const user = User.findByIdAndDelete({ _id: id });

    if (!user) {
      return error;
    }
    return user;
  } catch (error) {
    return error;
  }
};

module.exports = {
  createUserLogic,
  //userSignInLogic,
  allUsersLogic,
  getUser,
  getUserEmail,
  updateUserLogic,
  deleteUserLogic,
};
