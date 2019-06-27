const axios = require('axios');
const MessageHandler = require('../libs/messageHandler');
const UserHandler = require('../libs/userHandler');
const config = require('../config/default');

module.exports = {
  getUser: async (req, res) => {
    try {
      // get user data
      const userId = req.params.id;
      const userRes = await axios.get(`${config.userUrl}${userId}`);

      // check whether image for the user exists or not
      const image = await UserHandler.getUserImageB64(userId);
      if (image.error) {
        // if not exists download
        await UserHandler.imageDownload(userId, userRes.data.data.avatar);
      }

      const responseObj = {
        user: userRes.data.data,
      };

      // send response
      return new MessageHandler(req, res)
        .success()
        .setMessage('success')
        .setData(responseObj)
        .handle();
    } catch (err) {
      return new MessageHandler(req, res)
        .badRequest()
        .setMessage('get_user_error')
        .setData(new Error(err))
        .handle();
    }
  },

  getUserAvatar: async (req, res) => {
    try {
      const userId = req.params.id;
      const responseObj = {};

      // check whether image for the user exists or not
      const image = await UserHandler.getUserImageB64(userId);
      if (image.error) {
        // if not exists download
        const userRes = await axios.get(`${config.userUrl}${userId}`);
        responseObj.avatar = await UserHandler.imageDownload(userId, userRes.data.data.avatar);

        return new MessageHandler(req, res)
          .success()
          .setMessage('success')
          .setData(responseObj)
          .handle();
      }

      responseObj.avatar = image.data;

      // send response
      return new MessageHandler(req, res)
        .success()
        .setMessage('success')
        .setData(responseObj)
        .handle();
    } catch (err) {
      return new MessageHandler(req, res)
        .badRequest()
        .setMessage('get_user_avatar_error')
        .setData(new Error(err))
        .handle();
    }
  },

  deleteUserAvatar: async (req, res) => {
    try {
      const userId = req.params.id;
      await UserHandler.deleteUserImage(userId);

      return new MessageHandler(req, res)
        .success()
        .setMessage('success')
        .handle();
    } catch (err) {
      return new MessageHandler(req, res)
        .badRequest()
        .setMessage('delete_user_avatar_error')
        .setData(new Error(err))
        .handle();
    }
  },
};
