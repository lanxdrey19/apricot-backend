const User = require("../entities/User");

const putTokens = async function (requestBody) {
  try {
    const user = await User.findOne({
      userId: requestBody.userId,
    });

    let isValid = true;

    if (Number(user.tokens) - Number(requestBody.number) < 0) {
      isValid = false;
    }

    if (isValid) {
      const updatedUser = await User.updateOne(
        { userId: requestBody.userId },
        { $inc: { tokens: Number(requestBody.number) * -1 } }
      );
      return updatedUser;
    } else {
      throw new Error("insufficient funds");
    }
  } catch (err) {
    throw new Error("server error occurred");
  }
};

module.exports = {
  putTokens,
};
