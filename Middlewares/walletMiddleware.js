const validateWallet = (req, res, next) => {
  const { user_id, name } = req.body;

  if (!user_id || !name) {
    return res.status(400).json({ message: 'All fields are required (user_id, name)' });
  }

  next();
};

module.exports = validateWallet;