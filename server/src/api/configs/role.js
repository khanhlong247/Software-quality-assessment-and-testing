const SERVER_ROLES = {
  ADMIN: "admin",
  USER: "user",
};

const ROLES = {
  ADMIN: SERVER_ROLES.ADMIN,
  GENERAL: [SERVER_ROLES.ADMIN, SERVER_ROLES.USER],
};

module.exports = ROLES;
