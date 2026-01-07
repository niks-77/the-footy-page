import express from 'express';
import {
  getAllLiveScores,
  getTodayGames,
  getYesterdayGames,
  getTomorrowGames,
  getGameDetails,
  getGameStats
} from './footballService.js';

const router = express.Router();

router.get('/today', async (req, res) => {
  res.json(await getTodayGames());
});

router.get('/yesterday', async (req, res) => {
  res.json(await getYesterdayGames());
});

router.get('/tomorrow', async (req, res) => {
  res.json(await getTomorrowGames());
});

router.get('/live', async (req, res) => {
  res.json(await getAllLiveScores());
});

router.get('/game/:id', async (req, res) => {
  res.json(await getGameDetails(req.params.id));
});

router.get('/game/:id/stats', async (req, res) => {
  res.json(await getGameStats(req.params.id));
});

export default router;
