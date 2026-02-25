const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController.js');
const validateUser = require('../Middlewares/userMiddleware.js');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', validateUser, userController.createUser);
router.delete('/:id', userController.deleteUser);
router.put('/:id', validateUser, userController.updateUser);

module.exports = router;