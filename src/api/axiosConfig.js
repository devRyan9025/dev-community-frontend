import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  withCredentials: false,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // ✅ 토큰 자동 첨부
  }
  return config;
});

export default instance;
