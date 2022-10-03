const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Static method to sign up user
userSchema.statics.signingUp = async function (_id, email, password) {
  //if the user leaves either email, username or password empty we throw an Error

  if (!email) {
    throw Error("You can not leave email empty");
  }
  if (!password) {
    throw Error("You can not leave password empty");
  }
  /*
        we check to see if theemail  already exists by using the method findOne
        If the email is already registered we throw an Error
      */
  const emailExists = await this.findOne({ email });
  const idExists = await this.findOne({ _id });
 

  if (emailExists) {
    throw Error("The email is already registered");
  }

  if(idExists) {
    throw Error("The ID is already taken");
  }

  // we take the password and salt it for 10 rounds and save it in the variable called hashed
  const salted = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salted);

  // if all goes well, we return the user
  const user = await this.create({ _id, email, password: hashed });
  return user;
};

userSchema.statics.signingIn = async function (email, password) {
  if (!email || !password) {
    throw Error("You can not leave any fields empty");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("No user found with this email");
  }

  // compare the password with the one given by registration
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password. Try again");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
