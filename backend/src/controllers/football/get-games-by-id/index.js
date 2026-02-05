import axios from 'axios';
import getGamesByIdSchema from './schema.js';

const BASE_URL = 'https://v3.football.api-sports.io';

const getHeaders = () => ({
    'x-apisports-key': process.env.API_KEY
});

const getGamesById = async (req, res, next) => {
    try {
        const { fixture } = getGamesByIdSchema.parse(req.query)

        const response = await axios.get(`${BASE_URL}/fixtures/statistics?fixture=${fixture}`,
            { headers: getHeaders() })
        res.json(response.data)
    }
    catch (error) {
        next(error)
    }
}

export default getGamesById;