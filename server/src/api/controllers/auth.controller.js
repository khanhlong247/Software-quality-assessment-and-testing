const authServices = require("../services/auth.service");
const userServices = require("../services/user.service");
module.exports.register = async (req, res) => {
  try {
    const { email, full_name, password } = req.body;
    const exists = await userServices.emailExist(email);
    if (exists) {
      res.status(409).json({ message: "User with email already exists" });
      return;
    }
    await authServices.register(email, full_name, password);
    res.status(201).json({ message: "Register successfully!" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error!", error: error.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exists = await userServices.emailExist(email);

    if (exists) {
      res.status(409).json({ message: "User with email already exists" });
      return;
    }

    let token = await authServices.login(email, password);
    if (!token) {
      res.status(406).json({ error: "Invalid password!" });
    } else {
      res.status(200).json({ message: "Login succeeded!", token: token });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error!", error: error.message });
  }
};
