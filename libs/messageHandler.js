// Http response creator
class MessageHandler {
  constructor(req, res) {
    this.req = req;
    this.res = res;

    this.json = {
      status: 0,
      message: '',
    };
  }

  setMessage(message) {
    this.json.message = message;

    return this;
  }

  setData(data) {
    if (data instanceof Error) {
      this.json.data = data.message;
    } else {
      this.json.data = data;
    }

    return this;
  }

  // Status list
  success() {
    this.json.status = 200;
    return this;
  }

  badRequest() {
    this.json.status = 400;
    return this;
  }

  // Sends responses
  handle() {
    return this.res.status(this.json.status).send(this.json);
  }
}

module.exports = MessageHandler;
