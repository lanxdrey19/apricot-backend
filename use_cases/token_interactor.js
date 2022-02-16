const executeSubtractTokens = async function (tokenController, requestBody) {
  return await tokenController.subtractTokens(requestBody);
};

module.exports = {
  executeSubtractTokens,
};
