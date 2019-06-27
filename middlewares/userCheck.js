const MessageHandler = require('../libs/messageHandler');
const UserHandler = require('../libs/userHandler');

module.exports = (req, res, next) => {
  const userId = req.params.id;

  const { error } = UserHandler.validateUserInput({ userId });
  if (error) {
    return new MessageHandler(req, res)
      .badRequest()
      .setMessage('error')
      .setData(error.details[0].message)
      .handle();
  }

  return next();
};
