const fs = require('fs');
const util = require('util');
const axios = require('axios');
const Joi = require('@hapi/joi');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const unlink = util.promisify(fs.unlink);

class UserHandler {
  static async getUserImageB64(userId) {
    try {
      const imagePath = UserHandler.getUserImagePath(userId);

      const obj = await readFile(imagePath);
      return { data: obj.toString('base64') };
    } catch (ex) {
      return { error: new Error(ex) };
    }
  }

  static async imageDownload(userId, imageUrl) {
    const imagePath = UserHandler.getUserImagePath(userId);
    const imageRes = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageB64 = Buffer.from(imageRes.data).toString('base64');

    await writeFile(imagePath, imageRes.data);
    return imageB64;
  }

  static async deleteUserImage(userId) {
    const imagePath = UserHandler.getUserImagePath(userId);

    const del = await unlink(imagePath);
    return del;
  }

  static getUserImagePath(userId) {
    return `./resources/pics/user${userId}.jpg`;
  }

  static validateUserInput(obj) {
    const schema = Joi.object().keys({
      userId: Joi.number().integer(), // check user id is integer or not
    });

    return Joi.validate(obj, schema);
  }
}

module.exports = UserHandler;
