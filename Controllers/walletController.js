const wallets = [];
let nextId = 1;


const getAllWallets = (req, res) => {
  res.json(wallets);
};

const getWalletById = (req, res) => {
  const wallet = wallets.find(w => w.id === parseInt(req.params.id));
  if (!wallet) {
    return res.status(404).json({ message: 'Wallet not found' });
  }
  res.json(wallet);
};

const createWallet = (req, res) => {
  const { user_id, name }  = req.body;

  const newWallet = {
    id: nextId++, 
    user_id,
    name,
    sold: 0, 
  };

  wallets.push(newWallet);

  res.status(201).json(newWallet);
};


const deleteWallet = (req, res) => {
  const index = wallets.findIndex(w => w.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: 'Wallet not found' });
  }

  wallets.splice(index, 1);

  res.json({ message: 'Wallet deleted successfully' });
};

const updateWallet = (req, res) => {
  const wallet = wallets.find(w => w.id === parseInt(req.params.id));

  if (!wallet) {
    return res.status(404).json({ message: 'Wallet not found' });
  }

  const { name, sold } = req.body;

  if (name) {
    wallet.name = name;
  }

  if (sold !== undefined) {
    wallet.sold = sold;
  }

  res.json({ message: 'Wallet updated successfully', wallet });
};

const depositWallet = (req, res) => {
  const wallet = wallets.find(w => w.id === parseInt(req.params.id));

  if (!wallet) {
    return res.status(404).json({ message: 'Wallet not found' });
  }

  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Amount must be a positive number' });
  }

  wallet.sold += amount;

  res.json({ message: 'Deposit successful', wallet });
};

const withdrawWallet = (req, res) => {
  const wallet = wallets.find(w => w.id === parseInt(req.params.id));

  if (!wallet) {
    return res.status(404).json({ message: 'Wallet not found' });
  }

  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Amount must be a positive number' });
  }

  if (wallet.sold < amount) {
    return res.status(400).json({ message: 'Insufficient funds' });
  }

  wallet.sold -= amount;

  res.json({ message: 'Withdrawal successful', wallet });
};

module.exports = { getAllWallets, getWalletById, createWallet, deleteWallet, updateWallet, depositWallet, withdrawWallet };