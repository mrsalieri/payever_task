const express = require('express');
const user = require('./routes/user');
require('./cronjobs/userData');

const app = express();

app.use('/api/user', user);

const server = app.listen(3000);

module.exports = server;
