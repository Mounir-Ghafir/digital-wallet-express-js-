const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/wallets.json');

const readWallets = () => {
  if (!fs.existsSync(DATA_FILE)) return { wallets: [], nextId: 1 };
  const content = fs.readFileSync(DATA_FILE, 'utf-8').trim();
  if (!content) return { wallets: [], nextId: 1 };
  return JSON.parse(content);
};

const writeWallets = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

const getAllWallets = (req, res) => {
  const { wallets } = readWallets();
  res.json(wallets);
};

const getWalletById = (req, res) => {
  const { wallets } = readWallets();
  const wallet = wallets.find(w => w.id === parseInt(req.params.id));
  if (!wallet) return res.status(404).json({ message: 'Wallet not found' });
  res.json(wallet);
};

const createWallet = (req, res) => {
  const data = readWallets();
  const { user_id, name } = req.body;

  const newWallet = { id: data.nextId++, user_id, name, sold: 0 };
  data.wallets.push(newWallet);
  writeWallets(data);

  res.status(201).json(newWallet);
};

const deleteWallet = (req, res) => {
  const data = readWallets();
  const index = data.wallets.findIndex(w => w.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Wallet not found' });

  data.wallets.splice(index, 1);
  writeWallets(data);

  res.json({ message: 'Wallet deleted successfully' });
};

const updateWallet = (req, res) => {
  const data = readWallets();
  const wallet = data.wallets.find(w => w.id === parseInt(req.params.id));
  if (!wallet) return res.status(404).json({ message: 'Wallet not found' });

  const { name, sold } = req.body;
  if (name) wallet.name = name;
  if (sold !== undefined) wallet.sold = sold;
  writeWallets(data);

  res.json({ message: 'Wallet updated successfully', wallet });
};

const depositWallet = (req, res) => {
  const data = readWallets();
  const wallet = data.wallets.find(w => w.id === parseInt(req.params.id));
  if (!wallet) return res.status(404).json({ message: 'Wallet not found' });

  const { amount } = req.body;
  if (!amount || amount <= 0) return res.status(400).json({ message: 'Amount must be a positive number' });

  wallet.sold += amount;
  writeWallets(data);

  res.json({ message: 'Deposit successful', wallet });
};

const withdrawWallet = (req, res) => {
  const data = readWallets();
  const wallet = data.wallets.find(w => w.id === parseInt(req.params.id));
  if (!wallet) return res.status(404).json({ message: 'Wallet not found' });

  const { amount } = req.body;
  if (!amount || amount <= 0) return res.status(400).json({ message: 'Amount must be a positive number' });
  if (wallet.sold < amount) return res.status(400).json({ message: 'Insufficient funds' });

  wallet.sold -= amount;
  writeWallets(data);

  res.json({ message: 'Withdrawal successful', wallet });
};

module.exports = { getAllWallets, getWalletById, createWallet, deleteWallet, updateWallet, depositWallet, withdrawWallet };