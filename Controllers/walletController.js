const { v4: uuidv4 } = require('uuid'); // 👈 add this at the top

const wallets = [
  { id: uuidv4(), user_id: 1, name: 'Main Wallet',    sold: 0 },
  { id: uuidv4(), user_id: 1, name: 'Savings Wallet', sold: 0 },
];

const getAllWallets = (req, res) => {
  res.json(wallets);
};

const getWalletById = (req, res) => {
  const wallet = wallets.find(w => w.id === req.params.id);
  if (!wallet) {
    return res.status(404).json({ message: 'Wallet not found' });
  }
  res.json(wallet);
};

// 👇 new function
const createWallet = (req, res) => {
  const { user_id, name } = req.body;

  const newWallet = {
    id: uuidv4(), // 👈 generates a unique id automatically
    user_id,
    name,
    sold: 0, // 👈 always starts with 0
  };

  wallets.push(newWallet);

  res.status(201).json(newWallet);
};

module.exports = { getAllWallets, getWalletById, createWallet };