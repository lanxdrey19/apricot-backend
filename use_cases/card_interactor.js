const executeGetUserCards = async function (cardController, userId) {
  return await cardController.getUserCards(userId);
};

const executeGetCardsByName = async function (
  cardController,
  userId,
  nameKeyWord
) {
  return await cardController.getCardsByName(userId, nameKeyWord);
};

const executeGetCardsByGroup = async function (
  cardController,
  userId,
  groupKeyWord
) {
  return await cardController.getCardsByGroup(userId, groupKeyWord);
};

const executeGetCardsByTag = async function (cardController, userId, tagName) {
  return await cardController.getCardsByTag(userId, tagName);
};

const executeGetCardsBySerial = async function (
  cardController,
  userId,
  upperBound,
  lowerBound
) {
  return await cardController.getCardsBySerial(userId, upperBound, lowerBound);
};

const executeGetCardsByStars = async function (
  cardController,
  userId,
  upperBound,
  lowerBound
) {
  return await cardController.getCardsByStars(userId, upperBound, lowerBound);
};

const executeAddCardToUser = async function (
  cardController,
  templateId,
  requestBody
) {
  return await cardController.addCardToUser(templateId, requestBody);
};

const executeClaimCard = async function (
  cardController,
  templateId,
  requestBody
) {
  return await cardController.claimCard(templateId, requestBody);
};

const executeDeleteCardFromUser = async function (
  cardController,
  templateId,
  requestBody
) {
  return await cardController.deleteCardFromUser(templateId, requestBody);
};

const executeBurnCard = async function (
  cardController,
  templateId,
  requestBody
) {
  return await cardController.burnCard(templateId, requestBody);
};

module.exports = {
  executeGetUserCards,
  executeGetCardsByName,
  executeGetCardsByGroup,
  executeGetCardsByTag,
  executeGetCardsBySerial,
  executeGetCardsByStars,
  executeAddCardToUser,
  executeClaimCard,
  executeDeleteCardFromUser,
  executeBurnCard,
};
