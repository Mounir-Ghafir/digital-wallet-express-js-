const wallets = [
  { id: 1, user_id: 1, name: 'Main Wallet',    sold: 1500 },
  { id: 2, user_id: 1, name: 'Savings Wallet', sold: 3000 },
  { id: 3, user_id: 2, name: 'Main Wallet',    sold: 500  },
];

const getAllWallets = (req, res) => {
  res.json(wallets);
};

const getWalletById = (req, res) => {
  const wallet = wallets.find(w => w.id === Number(req.params.id));

  if (!wallet) {
    return res.status(404).json({ message: 'Wallet not found' });
  }

  res.json(wallet);
};

module.exports = { getAllWallets, getWalletById };