const express = require('express');
const router = express.Router();
const walletController = require('./walletController');

router.get('/', walletController.getAllWallets);
router.get('/:id', walletController.getWalletById);

module.exports = router;