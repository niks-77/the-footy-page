import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import footballRouter from './routes/football/routes.js';
import { errorHandler, unknownEndpoint } from './middleware/error.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', footballRouter);

app.use(unknownEndpoint)
app.use(errorHandler);

app.listen(3001, () => {
  console.log('Backend running on http://localhost:3001');
});
