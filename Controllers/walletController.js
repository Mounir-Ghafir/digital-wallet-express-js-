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

module.exports = { getAllWallets, getWalletById, createWallet };