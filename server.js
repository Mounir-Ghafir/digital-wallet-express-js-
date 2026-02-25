const express = require('express');
const userRouter = require('./userRouter');

const app = express();

app.use('/users', userRouter);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});