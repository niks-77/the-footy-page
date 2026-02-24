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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
