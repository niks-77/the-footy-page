import axios from 'axios';
import getLiveGamesSchema from './schema.js';
import cache from '../../../lib/cache.js';

const BASE_URL = 'https://v3.football.api-sports.io';

const getHeaders = () => ({
    'x-apisports-key': process.env.API_KEY
});

const getLiveGames = async (req, res, next) => {
    try {
        const { live } = getLiveGamesSchema.parse(req.query)

        const cacheKey = 'live-games-all';
        const cachedData = cache.get(cacheKey);

        if (cachedData) {
            console.log(`[BACKEND] Cache hit for ${cacheKey}`);
            return res.json(cachedData);
        }

        console.log('[BACKEND] /games/live API call')

        const response = await axios.get(`${BASE_URL}/fixtures?live=all`, { headers: getHeaders() })

        const data = response.data;

        // Cache live games for 60 seconds (enough to stay under 10/min)
        cache.set(cacheKey, data, 60);

        res.json(data)
    }
    catch (error) {
        next(error)
    }
}

export default getLiveGames;
