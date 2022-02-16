const User = require("../entities/User");
const userDAO = require("../daos/user_dao");

const createUser = async function (userId) {
  return await userDAO.postUser(userId);
};

const getUser = async function (userId) {
  return await userDAO.findUser(userId);
};

module.exports = {
  createUser,
  getUser,
};
