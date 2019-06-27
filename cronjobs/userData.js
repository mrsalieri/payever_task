const fs = require('fs');
const CronJob = require('cron').CronJob;
const axios = require('axios');

// reads and parses file
function jsonReader(filePath, cb) {
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      return cb && cb(err);
    }
    try {
      const object = JSON.parse(fileData);
      return cb && cb(null, object);
    } catch (err2) {
      return cb && cb(err2);
    }
  });
}

// IIFE for cron job
(() => {
  if (process.env.NODE_ENV !== 'test') {
    let page = 1;
    let nextPage = 1;
    const file = './resources/data/user.json';

    // job activation, first param is for defining the job pattern, i.e. every 1 min
    const job = new CronJob('0 */1 * * * *', async () => {
      const userRes = await axios.get(`https://reqres.in/api/users?page=${page}`);

      jsonReader(file, (err, data) => {
        if (err) return;

        const param = data;
        // append new data
        userRes.data.data.forEach((user) => {
          param[user.id] = user;
        });

        fs.writeFile(file, JSON.stringify(param, null, 2), (err2) => {
          if (!err2) nextPage += 1;
        });
      });

      page = Math.min(nextPage, userRes.data.total_pages);
    });

    job.start();
  }
})();
