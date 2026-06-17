import axios from 'axios';
import { getToken, clearAuth } from './authStorage';

const BASE_URL = process.env.REACT_APP_API_BASE || 'http://localhost:3002/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 12000,
});

const setToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common.Authorization;
  }
};

apiClient.setToken = setToken;

const initialToken = getToken();
if (initialToken && initialToken !== 'null') {
  setToken(initialToken);
}

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Auth error:', error.response.data?.message || 'Unauthorized');
      clearAuth();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
