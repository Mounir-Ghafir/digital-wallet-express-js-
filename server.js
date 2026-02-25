const express = require('express');
const userRouter = require('./Routers/userRouter');
const walletRouter = require('./Routers/walletRouter');

const app = express();

app.use(express.json());

app.use('/users', userRouter);
app.use('/wallets', walletRouter);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});