import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import walrRoutes from './routes/walrs.js';
import userRoutes from './routes/users.js';

const app = express();
app.use(express.json({ limit: '10mb', extended: true }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/walrs', walrRoutes);
app.use('/users', userRoutes);

const cs50_db_url = 'mongodb+srv://cs50_user:pGbg6xamCUrCDPKW@trawalrus.inrj9.mongodb.net/trawalrus?retryWrites=true&w=majority'

dotenv.config();
const DB_URL = process.env.DB_URL || cs50_db_url;
const PORT = process.env.PORT || 3131;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('MongoDB Cloud connected successfully.');
  })
  .catch((error) => {
    console.error(error);
  });

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
