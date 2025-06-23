import axios from './axiosInstance';

const API_URL = 'http://localhost:8080/stats/report';

export const getReport = (level, year, orderBy, orderDir) => {
  const params = new URLSearchParams({
    level,
    year,
    orderBy: orderBy || 'total_salary',
    orderDir: orderDir || 'desc'
  });
  return axios.get(`${API_URL}?${params.toString()}`);
};