import axios from 'axios';

const API = import.meta.env.API_URL

export const getTodayGames = () => axios.get(`${API}/today`);
export const getYesterdayGames = () => axios.get(`${API}/yesterday`);
export const getTomorrowGames = () => axios.get(`${API}/tomorrow`);
export const getLiveGames = () => axios.get(`${API}/live`);
export const getGameDetails = (id) => axios.get(`${API}/game/${id}`);
export const getGameStats = (id) => axios.get(`${API}/game/${id}/stats`);
