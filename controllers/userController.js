const express = require("express");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const {
  //createUserLogic,
  oneUserLogic,
  deleteUserLogic,
  allUsersLogic,
  updateUserLogic,
} = require("../services/userServices");
const router = express.Router();

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "2d" });
};

//CREATE USER
const userSignUp = async (req, res) => {
  const { email, password, _id } = req.body;

  try {
    const user = await User.signingUp(_id, email, password);

    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
router.post("/signup", userSignUp);

// LOGIN USER
const userSignIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signingIn(email, password);

    //create a JWT based on the user _id
    const token = createToken(user._id);

    res.status(200).json({
      message: `The user ${user.email}, successfully signed in with token: ${token}`,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
router.post("/signin", userSignIn);


//GET ALL USERS - SWAGGER
const allUsers = async (req, res) => {
  const users = await allUsersLogic();

  if (users) res.status(200).json({ users });
  else {
    return res.status(400).json("No users found");
  }
};
router.get("/", allUsers);

//GET /READ ONE USER BY ID
const oneUser = async (req, res) => {
  const { id } = req.params;

  const user = await oneUserLogic(id);
  if (user._id) {
    return res.status(200).json({ user });
  } else {
    return res
      .status(400)
      .json({ error: "Could not find a user with that ID" });
  }
};
router.get("/:id", oneUser);

// UPDATE ONE USER BY ID
const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await updateUserLogic(id, req.body);

    if (id) {
      return res.status(200).json(user);
    } else {
      return res
        .status(400)
        .json({ error: "Could not find a user with that ID to update" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
router.patch("/:id", updateUser);

// DELETE ONE USER BY ID
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await deleteUserLogic(id);

    if (user.id) {
      res.status(201).json("User successfully deleted");
    } else {
      return res
        .status(400)
        .json({ error: "Could not find a user with that ID to delete" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
router.delete("/:id", deleteUser);

module.exports = {
  userSignUp,
  userSignIn,
  //createUser,
  allUsers,
  oneUser,
  updateUser,
  deleteUser,
  router,
};
