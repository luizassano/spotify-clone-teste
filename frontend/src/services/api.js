import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  console.log('[API] Enviando requisição para:', config.url);
  console.log('[API] Método:', config.method);
  console.log('[API] Dados:', config.data);
  console.log('[API] Headers:', config.headers);
  return config;
}, error => {
  console.error('[API] Erro na requisição:', error);
  return Promise.reject(error);
});

api.interceptors.response.use(
  response => {
    console.log('[API] Resposta recebida de:', response.config.url);
    console.log('[API] Status:', response.status);
    console.log('[API] Dados:', response.data);
    return response.data;
  },
  error => {
    console.error('[API] Erro na resposta:');
    console.error('[API] URL:', error.config?.url);
    console.error('[API] Status:', error.response?.status);
    console.error('[API] Dados do erro:', error.response?.data);
    console.error('[API] Mensagem:', error.message);
    
    if (error.response) {
      return Promise.reject(error);
    } else if (error.request) {
      console.error('[API] O servidor não respondeu');
      return Promise.reject(new Error('Sem resposta do servidor'));
    } else {
      console.error('[API] Erro ao configurar a requisição');
      return Promise.reject(error);
    }
  }
);

export default api;