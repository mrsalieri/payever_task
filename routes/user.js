const express = require('express');
const userCheck = require('../middlewares/userCheck');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/:id', userCheck, async (req, res) => {
  await userController.getUser(req, res);
});

router.get('/:id/avatar', userCheck, async (req, res) => {
  await userController.getUserAvatar(req, res);
});

router.delete('/:id/avatar', userCheck, async (req, res) => {
  await userController.deleteUserAvatar(req, res);
});

module.exports = router;
