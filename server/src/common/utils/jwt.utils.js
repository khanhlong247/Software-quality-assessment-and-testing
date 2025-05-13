const jwt = require("jsonwebtoken");

module.exports.jwtSign = (user) => {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRED_IN,
  });
};

module.exports.jwtDecode = (token) => {
  return jwt.decode(token, process.env.JWT_SECRET);
};
