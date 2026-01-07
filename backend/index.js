import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import footballRoutes from './footballRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', footballRoutes);

app.listen(3001, () => {
  console.log('Backend running on http://localhost:3001');
});
