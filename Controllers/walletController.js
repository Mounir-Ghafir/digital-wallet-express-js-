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
  const wallet = wallets.find(w => w.id === Number(req.params.id));

  if (!wallet) {
    return res.status(404).json({ message: 'Wallet not found' });
  }

  const { name } = req.body;

  wallet.name = name;

  res.json({ message: 'Wallet updated successfully', wallet });
};

module.exports = { getAllWallets, getWalletById, createWallet, deleteWallet, updateWallet };