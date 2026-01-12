import axios from 'axios';
import NodeCache from 'node-cache';

const BASE_URL = 'https://v3.football.api-sports.io';
const cache = new NodeCache({ stdTTL: 600 }); // Default TTL 10 minutes

const getHeaders = () => ({
  'x-apisports-key': process.env.API_KEY
});

const getDateString = (offset = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().split('T')[0];
};

const fetchWithCache = async (key, fetchFunction, ttl = 600) => {
  const cachedData = cache.get(key);
  if (cachedData) {
    console.log(`Cache HIT for ${key}`);
    return cachedData;
  }

  console.log(`Cache MISS for ${key}`);
  const data = await fetchFunction();
  cache.set(key, data, ttl);
  return data;
};

export const getAllLiveScores = async () => {
  const key = 'live_scores';
  // Cache live scores for 20 minutes (1200s) to save requests (Free Tier: 3 req/hour)
  return fetchWithCache(key, async () => {
    const res = await axios.get(`${BASE_URL}/fixtures?live=all`, { headers: getHeaders() });
    return res.data;
  }, 1200);
};

export const getTodayGames = async () => {
  const date = getDateString(0);
  const key = `fixtures_${date}`;

  // Cache today's games for 1 hour
  return fetchWithCache(key, async () => {
    const res = await axios.get(
      `${BASE_URL}/fixtures?date=${date}&timezone=12`,
      { headers: getHeaders() }
    );
    return res.data;
  }, 3600);
};

export const getYesterdayGames = async () => {
  const date = getDateString(-1);
  const key = `fixtures_${date}`;

  // Cache yesterday's games for 24 hours
  return fetchWithCache(key, async () => {
    const res = await axios.get(
      `${BASE_URL}/fixtures?date=${date}&timezone=12`,
      { headers: getHeaders() }
    );
    return res.data;
  }, 86400);
};

export const getTomorrowGames = async () => {
  const date = getDateString(1);
  const key = `fixtures_${date}`;

  // Cache tomorrow's games for 24 hours
  return fetchWithCache(key, async () => {
    const res = await axios.get(
      `${BASE_URL}/fixtures?date=${date}&timezone=12`,
      { headers: getHeaders() }
    );
    return res.data;
  }, 86400);
};

export const getGameDetails = async (id) => {
  const key = `fixture_${id}`;
  // Cache game details for 1 hour
  return fetchWithCache(key, async () => {
    const res = await axios.get(`${BASE_URL}/fixtures?id=${id}`, { headers: getHeaders() });
    return res.data;
  }, 3600);
};

export const getGameStats = async (id) => {
  const key = `fixture_stats_${id}`;
  // Cache stats for 1 hour
  return fetchWithCache(key, async () => {
    const res = await axios.get(
      `${BASE_URL}/fixtures/statistics?fixture=${id}`,
      { headers: getHeaders() }
    );
    return res.data;
  }, 3600);
};