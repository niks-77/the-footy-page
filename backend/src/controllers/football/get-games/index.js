import axios from 'axios';
import getGamesSchema from './schema.js';

const BASE_URL = 'https://v3.football.api-sports.io';

const getHeaders = () => ({
  'x-apisports-key': process.env.API_KEY
});


const getGames = async (req, res, next) => {
  try {
    console.log('[BACKEND] /games query:', req.query)
    const { date } = getGamesSchema.parse(req.query)
    console.log(date)


    //if parse fails, zod throws error by default

    console.log('[BACKEND] /games hit with date:', req.query.date)

    const response = await axios.get(`${BASE_URL}/fixtures?date=${date}`,
      { headers: getHeaders() })
    res.json(response.data.response)
  }

  catch (error) {
    next(error)
  }
}

export default getGames;