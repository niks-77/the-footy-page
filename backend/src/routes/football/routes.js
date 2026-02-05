import express from 'express';
import getGames from '../../controllers/football/get-games/index.js';
import getGamesById from '../../controllers/football/get-games-by-id/index.js';
import getLiveGames from '../../controllers/football/get-live-games/index.js';

const router = express.Router();

router.get('/games', getGames)
router.get('/games/live', getLiveGames)
router.get('/games/statistics', getGamesById)

export default router;