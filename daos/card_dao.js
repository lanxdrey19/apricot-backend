const Server = require("../entities/Server");
const User = require("../entities/User");
const Template = require("../entities/Template");

const findUserCards = async function (userIdentifier) {
  try {
    const user = await User.findOne({
      userId: userIdentifier,
    });
    return user.cards;
  } catch (err) {
    throw new Error("server error occurred");
  }
};

const findCardsByName = async function (userIdentifier, nameKeyWord) {
  try {
    const user = await User.findOne({
      userId: userIdentifier,
    });

    let validCards = [];

    const cardsLength = user.cards.length;
    let count = 0;

    user.cards.forEach(async (card) => {
      const template = await Template.findById(card.templateId);
      if (template.name.toLowerCase().includes(nameKeyWord.toLowerCase())) {
        validCards.push(card);
      }
      count++;
      if (count === cardsLength) {
        return validCards;
      }
    });
  } catch (err) {
    throw new Error(
      "cards with that certain key term in their name can not be retrieved"
    );
  }
};

const findCardsByGroup = async function (userIdentifier, groupKeyWord) {
  try {
    const user = await User.findOne({
      userId: userIdentifier,
    });

    let validCards = [];

    const cardsLength = user.cards.length;
    let count = 0;

    user.cards.forEach(async (card) => {
      const template = await Template.findById(card.templateId);
      if (template.group.toLowerCase().includes(groupKeyWord.toLowerCase())) {
        validCards.push(card);
      }
      count++;
      if (count === cardsLength) {
        return validCards;
      }
    });
  } catch (err) {
    throw new Error(
      "cards with that certain key term in their group can not be retrieved"
    );
  }
};

const findCardsByTag = async function (userIdentifier, tagName) {
  try {
    const user = await User.findOne({
      userId: userIdentifier,
    });
    const result = user.cards.filter(
      (card) => card.tagName === tagName.toLowerCase()
    );
    return result;
  } catch (err) {
    throw new Error("cards with that tag cannot be retrieved");
  }
};

const findCardsBySerial = async function (
  userIdentifier,
  upperBound,
  lowerBound
) {
  try {
    const user = await User.findOne({
      userId: userIdentifier,
    });

    const result = user.cards.filter(
      (card) =>
        Number(card.recordedSerial) >= Number(lowerBound) &&
        Number(card.recordedSerial) <= Number(upperBound)
    );
    return result;
  } catch (err) {
    throw new Error(
      "cards with the serial bounds specified cannot be retrieved"
    );
  }
};

const findCardsByStars = async function (
  userIdentifier,
  upperBound,
  lowerBound
) {
  try {
    const user = await User.findOne({
      userId: userIdentifier,
    });

    const result = user.cards.filter(
      (card) =>
        Number(card.stars) >= Number(lowerBound) &&
        Number(card.stars) <= Number(upperBound)
    );
    return result;
  } catch (err) {
    throw new Error(
      "cards with the serial bounds specified cannot be retrieved"
    );
  }
};

const addCardToUser = async function (userIdentifier, cardObject) {
  const updatedUser = await User.updateOne(
    { userId: userIdentifier },
    { $push: { cards: cardObject } }
  );
  return updatedUser;
};

const addClaimedCardToUser = async function (
  templateIdentifier,
  userIdentifier,
  finalStars
) {
  const template = await Template.findById(templateIdentifier);
  let card = {
    templateId: template._id,
    recordedSerial: template.serial,
    stars: finalStars,
    tagName: "",
  };
  const updatedUser = await User.updateOne(
    { userId: userIdentifier },
    { $push: { cards: card } }
  );

  return updatedUser;
};

const deleteCardFromUser = async function (userIdentifier, cardObject) {
  const updatedUser = await User.updateOne(
    { userId: userIdentifier },
    { $pull: { cards: cardObject } }
  );

  return updatedUser;
};

const deleteBurntCardFromUser = async function (
  userIdentifier,
  cardObject,
  finalTokens
) {
  let updatedUser = {
    message: "Success. Maximum number of tokens reached.",
  };

  const user = await User.findOne({
    userId: userIdentifier,
  });

  if (Number(finalTokens) + Number(user.tokens) > 100000) {
    await User.updateOne(
      { userId: userIdentifier },
      { $set: { tokens: 100000 }, $pull: { cards: cardObject } }
    );
  } else {
    updatedUser = await User.updateOne(
      { userId: req.body.userId },
      { $inc: { tokens: finalTokens }, $pull: { cards: cardObject } }
    );
  }
  return updatedUser;
};

module.exports = {
  findUserCards,
  findCardsByName,
  findCardsByGroup,
  findCardsByTag,
  findCardsBySerial,
  findCardsByStars,
  addCardToUser,
  addClaimedCardToUser,
  deleteCardFromUser,
  deleteBurntCardFromUser,
};
