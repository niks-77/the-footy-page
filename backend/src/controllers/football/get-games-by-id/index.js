import axios from 'axios';
import getGamesByIdSchema from './schema.js';
import cache from '../../../lib/cache.js';

const BASE_URL = 'https://v3.football.api-sports.io';

const getHeaders = () => ({
    'x-apisports-key': process.env.API_KEY
});

const getGamesById = async (req, res, next) => {
    try {
        const { fixture } = getGamesByIdSchema.parse(req.query)

        const cacheKey = `game-statistics-${fixture}`;
        const cachedData = cache.get(cacheKey);

        if (cachedData) {
            console.log(`[BACKEND] Cache hit for ${cacheKey}`);
            return res.json(cachedData);
        }

        console.log('[BACKEND] /games/statistics API call for fixture:', fixture)

        const response = await axios.get(`${BASE_URL}/fixtures/statistics?fixture=${fixture}`,
            { headers: getHeaders() })

        const data = response.data;

        // Cache game stats for 10 minutes
        cache.set(cacheKey, data, 600);

        res.json(data)
    }
    catch (error) {
        next(error)
    }
}

export default getGamesById;