const users = [
  { id: 1, name: 'Alice', email: 'alice@email.com', phone: '111-222-3333' },
  { id: 2, name: 'Bob',   email: 'bob@email.com',   phone: '444-555-6666' },
];

// GET /users
const getAllUsers = (req, res) => {
  res.json(users);
};

// GET /users/1
const getUserById = (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
};

module.exports = { getAllUsers, getUserById };