const userServices = require("../services/user.service");
const {
  hashPassword,
  checkPassword,
} = require("../../common/utils/bcrypt.utils");
const { jwtSign } = require("../../common/utils/jwt.utils");

module.exports.register = async (email, full_name, password ) => {
  let hashed = await hashPassword(password);
  await userServices.createUser(email, full_name, hashed);
  return;
};

module.exports.login = async (email, password) => {
  let user = await userServices.getUserByEmail(email);
  let check = await checkPassword(password, user.hash_password);
  if (check) {
    let token = jwtSign(user);
    return token;
  } else {
    return (token = false);
  }
};
