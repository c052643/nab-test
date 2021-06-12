import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.get('/hello', (req, res) => {
  res.send('Hello');
});

app.listen(PORT, () => {
  console.log(`Server start at port ${PORT}`);
});
