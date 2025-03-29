import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  return config;
}, error => {
  console.error('[API] Erro na requisição:', error);
  return Promise.reject(error);
});

api.interceptors.response.use(
  response => {   
    return response;
  },
  error => {  
    return Promise.reject(error);
  }
);

export default api;