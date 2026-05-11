import React, { createContext, useEffect, useMemo, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext({
  user: null,
  token: null,
  loading: true,
  error: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
});

const STORAGE_TOKEN = 'trade_token';
const STORAGE_USER = 'trade_user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get('token');
    const userFromUrl = params.get('user');

    if (tokenFromUrl && userFromUrl) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(userFromUrl));
        saveSession(tokenFromUrl, parsedUser);
        params.delete('token');
        params.delete('user');
        const cleanSearch = params.toString();
        const cleanUrl = window.location.pathname + (cleanSearch ? `?${cleanSearch}` : '');
        window.history.replaceState({}, document.title, cleanUrl);
      } catch (err) {
        console.error('Failed to restore auth from URL params:', err);
      }
    } else {
      const savedToken = localStorage.getItem(STORAGE_TOKEN);
      const savedUser = localStorage.getItem(STORAGE_USER);
      if (savedToken && savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setToken(savedToken);
        setUser(parsedUser);
        api.setToken(savedToken);
      }
    }
    setLoading(false);
  }, []);

  const saveSession = (tokenValue, userData) => {
    setToken(tokenValue);
    setUser(userData);
    api.setToken(tokenValue);
    localStorage.setItem(STORAGE_TOKEN, tokenValue);
    localStorage.setItem(STORAGE_USER, JSON.stringify(userData));
  };

  const login = async (email, password) => {
    setError(null);
    try {
      const response = await api.post('/auth/login', { email, password });
      saveSession(response.data.token, response.data.user);
      return response.data.user;
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to login, please try again.');
      throw err;
    }
  };

  const signup = async (username, email, password) => {
    setError(null);
    try {
      const response = await api.post('/auth/signup', { username, email, password });
      saveSession(response.data.token, response.data.user);
      return response.data.user;
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to create account.');
      throw err;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    api.setToken(null);
    localStorage.removeItem(STORAGE_TOKEN);
    localStorage.removeItem(STORAGE_USER);
  };

  const value = useMemo(
    () => ({ user, token, loading, error, login, signup, logout }),
    [user, token, loading, error, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
