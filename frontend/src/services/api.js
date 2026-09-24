import axios from 'axios';

const DEFAULT_PROD_URL = 'https://scenepass-api.onrender.com';
const rawBase = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? DEFAULT_PROD_URL : '/api');
const API_BASE = rawBase.endsWith('/api') ? rawBase : (rawBase === '/api' ? '/api' : `${rawBase.replace(/\/$/, '')}/api`);

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to attach Auth JWT Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('scenepass_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
