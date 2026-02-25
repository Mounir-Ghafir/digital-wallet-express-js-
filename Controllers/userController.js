const users = [];
let length = 3

const getAllUsers = (req, res) => {
  res.json(users);
};

const getUserById = (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
};


const createUser = (req, res) => {
  const { name, email, phone } = req.body;

  const newUser = {
    id: length++,
    name,
    email,
    phone,
  };

  users.push(newUser);

  res.status(201).json({ message: 'User created successfully', user: newUser });
};

const deleteUser = (req, res) => {
  const index = users.findIndex(u => u.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users.splice(index, 1); 

  res.json({ message: 'User deleted successfully' });
};

const updateUser = (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const { name, email, phone } = req.body;

  user.name = name;
  user.email = email;
  user.phone = phone;

  res.json({ message: 'User updated successfully', user });
};

module.exports = { getAllUsers, getUserById, createUser, deleteUser, updateUser };




























