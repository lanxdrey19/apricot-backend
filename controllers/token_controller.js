const User = require("../entities/User");
const tokenDAO = require("../daos/token_dao");

const subtractTokens = async function (requestBody) {
  return await tokenDAO.putTokens(requestBody);
};

module.exports = {
  subtractTokens,
};
