const { getUsers } = require('../Controllers/userController.js');

const validateWallet = (req, res, next) => {
  const { user_id, name } = req.body;

  if (!user_id || !name) {
    return res.status(400).json({ message: 'user_id and name are required' });
  }

  const userExists = getUsers().some(u => u.id === Number(user_id));
  if (!userExists) {
    return res.status(404).json({ message: 'User not found' });
  }

  next();
};

module.exports = validateWallet;