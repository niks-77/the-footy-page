import axios from 'axios';

const BASE_URL = 'https://v3.football.api-sports.io';


const getHeaders = () => ({
  'x-apisports-key': process.env.API_KEY
});

const getDateString = (offset = 0) => { 
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().split('T')[0];
};

export const getAllLiveScores = async () => {
  const res = await axios.get(`${BASE_URL}/fixtures?live=all`, { headers: getHeaders() });
  return res.data;
};

export const getTodayGames = async () => {
  const date = getDateString(0);
  
  const res = await axios.get(
    `${BASE_URL}/fixtures?date=${date}&timezone=12`,
    { headers: getHeaders() }
  );
  return res.data;
};

export const getYesterdayGames = async () => {
  const date = getDateString(-1);
  const res = await axios.get(
    `${BASE_URL}/fixtures?date=${date}&timezone=12`,
    { headers: getHeaders() }
  );
  return res.data;
};

export const getTomorrowGames = async () => {
  const date = getDateString(1);
  const res = await axios.get(
    `${BASE_URL}/fixtures?date=${date}&timezone=12`,
    { headers: getHeaders() }
  );
  return res.data;
};

export const getGameDetails = async (id) => {
  const res = await axios.get(`${BASE_URL}/fixtures?id=${id}`, { headers: getHeaders() });
  return res.data;
};

export const getGameStats = async (id) => {
  const res = await axios.get(
    `${BASE_URL}/fixtures/statistics?fixture=${id}`,
    { headers: getHeaders() }
  );
  return res.data;
};