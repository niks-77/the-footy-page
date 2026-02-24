import axios from 'axios';
import getGamesSchema from './schema.js';
import cache from '../../../lib/cache.js';

const BASE_URL = 'https://v3.football.api-sports.io';

const getHeaders = () => ({
  'x-apisports-key': process.env.API_KEY
});


const getGames = async (req, res, next) => {
  try {
    console.log('[BACKEND] /games query:', req.query)
    const { date } = getGamesSchema.parse(req.query)

    const cacheKey = `games-${date}`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      console.log(`[BACKEND] Cache hit for ${cacheKey}`);
      return res.json(cachedData);
    }

    console.log('[BACKEND] /games API call for date:', date)

    const response = await axios.get(`${BASE_URL}/fixtures?date=${date}`,
      { headers: getHeaders() })

    const data = response.data.response;

    // Cache for 10 minutes to stay within the 10 requests per minute limit
    cache.set(cacheKey, data, 600);

    res.json(data)
  }

  catch (error) {
    next(error)
  }
}

export default getGames;