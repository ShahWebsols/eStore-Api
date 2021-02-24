const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //get token from header
  const token = req.header("x-auth-token");
  //check if token exists
  if (!token) {
    return res.status(400).json({ msg: "No token, Authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecretAdmin"));
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
