import axios from 'axios';


const todayDate = new Date();
const today = todayDate.toISOString().split('T')[0];

const yesterdayDate = new Date(todayDate);
yesterdayDate.setDate(todayDate.getDate() - 1);
const yesterday = yesterdayDate.toISOString().split('T')[0];

const tomorrowDate = new Date(todayDate);
tomorrowDate.setDate(todayDate.getDate() + 1);
const tomorrow = tomorrowDate.toISOString().split('T')[0];

const api_key = 'add5d053c843c99393bc7c8ac51b2dc7'

const url = 'https://v3.football.api-sports.io'
const headers = {
    'x-rapidapi-key': api_key,
    'x-rapidapi-host': 'v3.football.api-sports.io'
}

const getAllLiveScores = async () => {
    const response = await axios.get(`${url}/fixtures?live=all` , {headers})
    return response.data
}

const getTodayGames = async () => {
    const response = await axios.get(`${url}/fixtures?date=${today}&timezone=12`, {headers})
    return response.data
}

const getGameDetails = async (id) => {
    const response = await axios.get(`${url}/fixtures?id=${id}` , {headers})
    return response.data
}

const getGameStats = async (id) => {
    const response = await axios.get(`${url}/fixtures/statistics?fixture=${id}` , {headers})
    return response.data
}

const getYesterdayGames = async() => {
    const response = await axios.get(`${url}/fixtures?date=${yesterday}&timezone=12`, {headers})
    return response.data
}

const getTomorrowGames = async() => {
    const response = await axios.get(`${url}/fixtures?date=${tomorrow}&timezone=12`, {headers})
    return response.data
}

export default {getAllLiveScores, getGameDetails,getGameStats, getTodayGames, getYesterdayGames,
    getTomorrowGames
};




