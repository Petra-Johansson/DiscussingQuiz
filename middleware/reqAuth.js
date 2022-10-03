const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const reqAuth = async (req, res, next) => {
  // verify authorization from frontend/client.
  /*  headers: {
        'Authorization': `Bearer ${user.token}`
    }
    is placed where data should only be visible if logged in, in all fetch-functions 
    */
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  //we want to access element number 2 that is the actual token. The first element is "Bearer".
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = reqAuth;
