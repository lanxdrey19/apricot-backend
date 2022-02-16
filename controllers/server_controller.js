const Server = require("../entities/Server");
const serverDAO = require("../daos/server_dao");

const getServer = async function (serverId) {
  return await serverDAO.findServer(serverId);
};
const createServer = async function (requestBody) {
  const server = new Server({
    serverId: requestBody.serverId,
  });
  return await serverDAO.postServer(server);
};
const updateDropChannel = async function (serverId, requestBody) {
  return await serverDAO.putServerDropChannel(
    serverId,
    requestBody.dropChannel
  );
};

module.exports = {
  getServer,
  createServer,
  updateDropChannel,
};
