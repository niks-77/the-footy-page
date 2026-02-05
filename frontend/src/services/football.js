import axios from 'axios';

const API = import.meta.env.VITE_API_URL

export const getGames = (date) => axios.get(`${API}/games?date=${date}`)
export const getGamesById = (id) => axios.get(`${API}/games/statistics?fixture=${id}`)