const logger = require('../utils/logger');
const express = require('express');
const router = express.Router();
const storesController = require('../controllers/stores')
const authMiddleware = require('../middlewares/auth')
const validations = require('../middlewares/validations')

router.route('/stores')
  .get(authMiddleware.isAuth , storesController.getAll)
  .post(validations.storeInputs, authMiddleware.isAuth , storesController.create)

module.exports = router;
