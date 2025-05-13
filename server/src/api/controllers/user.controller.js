const services = require("../services/user.service");
const { hashPassword } = require("../../common/utils/bcrypt.utils");

module.exports.getUser = async (req, res) => {
  try {
    const users = await services.getUser();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error!", error: error.message });
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const user = await services.getUserById(req.params.id);

    if (user.length < 1) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error!", error: error.message });
  }
};

module.exports.getSelf = async (req, res) => {
  try {
    let id = req.user.id;
    let result = await services.getUserById(id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error!", error: error.message });
  }
};

module.exports.createUser = async (req, res) => {
  try {
    let { email,full_name, password } = req.body;
    let hash_password = await hashPassword(password);
    await services.createUser(email,full_name, hash_password);
    res.status(200).json({ message: "Create user successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error!", error: error.message });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    let id = req.user.id;
    let { email, password } = req.body;
    let hash_password = await hashPassword(password);

    // change email?
    let eExist = await services.emailExist(email);
    let user = await services.getUserById(id);
    if (user.email !== email && eExist) {
      res.status(409).json({ message: "Email already exists" });
      return;
    }

    await services.updateUser(id, email, hash_password);
    res.status(200).json({ message: "Update user successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error!", error: error.message });
  }
};

module.exports.updateUserById = async (req, res) => {
  try {
    let id = req.params.id;
    let { email, password } = req.body;

    // check user id exists
    const uExist = await services.userExist(id);
    if (!uExist) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // change email?
    let eExist = await services.emailExist(email);
    let user = await services.getUserById(id);
    if (user.email !== email && eExist) {
      res.status(409).json({ message: "Email already exists" });
      return;
    }

    // update
    let hash_password = await hashPassword(password);
    await services.updateUser(id, email, hash_password);
    res.status(200).json({ message: "Update user successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error!", error: error.message });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    let id = req.user.id;
    await services.deleteUser(id);
    res.status(200).json({ message: "Bye!" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error!", error: error.message });
  }
};

module.exports.deleteUserById = async (req, res) => {
  try {
    let id = req.params.id;
    const uExist = await services.userExist(id);

    if (!uExist) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    await services.deleteUser(id);
    res.status(200).json({ message: "Deleted user successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error!", error: error.message });
  }
};
