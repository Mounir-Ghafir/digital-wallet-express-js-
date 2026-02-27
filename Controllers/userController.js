const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/users.json');

const readUsers = () => {
  if (!fs.existsSync(DATA_FILE)) return { users: [], nextId: 1 };
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
};

const writeUsers = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

const getAllUsers = (req, res) => {
  const { users } = readUsers();
  res.json(users);
};

const getUserById = (req, res) => {
  const { users } = readUsers();
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

const createUser = (req, res) => {
  const data = readUsers();
  const { name, email, phone } = req.body;

  const newUser = { id: data.nextId++, name, email, phone };
  data.users.push(newUser);
  writeUsers(data);

  res.status(201).json({ message: 'User created successfully', user: newUser });
};

const deleteUser = (req, res) => {
  const data = readUsers();
  const index = data.users.findIndex(u => u.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'User not found' });

  data.users.splice(index, 1);
  writeUsers(data);

  res.json({ message: 'User deleted successfully' });
};

const updateUser = (req, res) => {
  const data = readUsers();
  const user = data.users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });

  const { name, email, phone } = req.body;
  user.name = name;
  user.email = email;
  user.phone = phone;
  writeUsers(data);

  res.json({ message: 'User updated successfully', user });
};

// Exported for use in validateWallet middleware
const getUsers = () => readUsers().users;

module.exports = { getAllUsers, getUserById, createUser, deleteUser, updateUser, getUsers };