const logger = require('../utils/logger');
const express = require('express');
const router = express.Router();
const storesController = require('../controllers/stores')


router.route('/stores')
  .get(storesController.getAll)
  .post(storesController.create)

module.exports = router;
