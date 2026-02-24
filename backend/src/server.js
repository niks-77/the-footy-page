import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import footballRouter from './routes/football/routes.js';
import { errorHandler, unknownEndpoint } from './middleware/error.js';

const app = express();
// Solve CORS: Explicitly allow the Vercel origin and required headers
// The generic app.use(cors()) often doesn't work well across different deployment platforms
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-apisports-key']
}));
app.use(express.json());

app.use('/api', footballRouter);

app.use(unknownEndpoint)
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
