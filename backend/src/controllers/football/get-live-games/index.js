import axios from 'axios';
import getLiveGamesSchema from './schema.js';

const BASE_URL = 'https://v3.football.api-sports.io';

const getHeaders = () => ({
    'x-apisports-key': process.env.API_KEY
});

const getLiveGames = async (req, res, next) => {
    try {
        const { live } = getLiveGamesSchema.parse(req.query)

        const response = await axios.get(`${BASE_URL}/fixtures?live=all`, { headers: getHeaders() })
        res.json(response.data)
    }
    catch (error) {
        next(error)
    }
}

export default getLiveGames;
