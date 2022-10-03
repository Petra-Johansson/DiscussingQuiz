const User = require("../models/userModel");

module.exports = class UserService {
  static getUsers() {
    return Users.find();
  }

  static getUser(id) {
    return User.findOne({ _id: id });
  }

  static async updateUser(id, body) {
    try {
      const user = await User.findOne({ _id: id });
      if (user) {
        if (user.email) {
          user.email = body.email;
        }
        if (body.password) {
          user.password = body.password;
        }
        await user.save();
      }
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteUser(id) {
    try {
      await User.findByIdAndDelete(id);
      return { status: 204 };
    } catch (error) {
      return { error: "Could not find a user with matching ID to delete" };
    }
  }
};
