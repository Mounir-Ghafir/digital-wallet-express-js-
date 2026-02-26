const express = require('express');
const router = express.Router();
const walletController = require('../Controllers/walletController');
const validateWallet = require('../Middlewares/walletMiddleware');

router.get('/', walletController.getAllWallets);
router.get('/:id', walletController.getWalletById);
router.post('/', validateWallet, walletController.createWallet);
router.delete('/:id', walletController.deleteWallet);
router.put('/:id', validateWallet, walletController.updateWallet);
router.post('/:id/deposit', walletController.depositWallet);
router.post('/:id/withdraw', walletController.withdrawWallet);

module.exports = router;