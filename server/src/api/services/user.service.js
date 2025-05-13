const db = require("../configs/db");

module.exports.getUser = async () => {
  let users = await db("users").select("*");
  return users;
};

module.exports.getUserById = async (id) => {
  let user = await db("users").select("*").where({ id });
  return user;
};

module.exports.deleteUser = async (id) => {
  await db("users").where({ id }).del();
  return;
};

module.exports.createUser = async (email, full_name, hash_password) => {
  let [id] = await db("users").insert({ email, full_name, hash_password });
  return id;
};

module.exports.userExist = async (id) => {
  let exists = await db("users").where({ id }).first();
  return !!exists;
};

module.exports.emailExist = async (email) => {
  let exists = await db("users").where({ email }).first();
  return !!exists;
};

module.exports.getUserByEmail = async (email) => {
  let [user] = await db("users").where({ email }).select("*");
  return user;
};

module.exports.updateUser = async (id, email, hash_password) => {
  await db("users").update({ email, hash_password }).where({ id });
  return;
};
