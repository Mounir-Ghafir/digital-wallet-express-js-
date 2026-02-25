const validateUser = (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'All fields are required (name, email, phone)' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Email is not valid' });
  }

  const phoneRegex = /^\+?[\d\s\-]{7,15}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ message: 'Phone is not valid' });
  }

  next();
};

module.exports = validateUser;