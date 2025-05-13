const { registerSchema } = require("../utils/validate.utils");
const userServices = require("../../api/services/user.service");
const { jwtDecode } = require("../utils/jwt.utils");

module.exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    const decoded = jwtDecode(token);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Authentication failed",
      error: error.message,
    });
  }
};

module.exports.validateRegister = async (req, res, next) => {
  let { email, password } = req.body;
  let { error } = registerSchema.validate({ email, password });
  try {
    if (error) {
      res.status(406).json({ message: "Invalid email or password!" });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error!", error: error.message });
  }
};

