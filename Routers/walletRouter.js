const express = require('express');
const router = express.Router();
const walletController = require('../Controllers/walletController');
const validateWallet = require('../Middlewares/walletMiddleware');

router.get('/', walletController.getAllWallets);
router.get('/:id', walletController.getWalletById);
router.post('/', validateWallet, walletController.createWallet);

module.exports = router;