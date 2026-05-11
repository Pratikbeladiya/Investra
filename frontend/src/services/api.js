import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE || 'http://localhost:3002/api';
const STORAGE_TOKEN = 'trade_token';
const STORAGE_USER = 'trade_user';
const LEGACY_STORAGE_TOKEN = 'zerodha_token';
const LEGACY_STORAGE_USER = 'zerodha_user';

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

const getStoredToken = () => localStorage.getItem(STORAGE_TOKEN) || localStorage.getItem(LEGACY_STORAGE_TOKEN);

const initialToken = getStoredToken();
if (initialToken && initialToken !== 'null') {
  setToken(initialToken);
}

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Auth error:', error.response.data?.message || 'Unauthorized');
      localStorage.removeItem(STORAGE_TOKEN);
      localStorage.removeItem(STORAGE_USER);
      localStorage.removeItem(LEGACY_STORAGE_TOKEN);
      localStorage.removeItem(LEGACY_STORAGE_USER);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
